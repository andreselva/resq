import { Injectable, Logger } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventEntity } from 'src/entities/event-entity';
import { UserEntity } from 'src/entities/user-entity';
import { UserType } from 'src/enums/user-type.enum';

@Injectable()
export class EventsProcessorService {
  private readonly logger = new Logger(EventsProcessorService.name);

  constructor(private readonly repository: EventsRepository) {}

  async process(event: EventEntity) {
    const [minLat, maxLat, minLon, maxLon, radiusMeters] =
      this.processCoordinates(
        event.impact_radius,
        event.latitude,
        event.longitude,
      );

    const volunteerPeople: UserEntity[] = [];
    const peopleAtRisk: UserEntity[] = [];

    const people = await this.repository.getPeople(
      event,
      minLon,
      maxLon,
      minLat,
      maxLat,
      radiusMeters,
    );

    /**
     * Para a V1, serão considerados todas as pessoas normais e todos os voluntários no raio.
     *
     * O ideal aqui seria pegar as pessoas em risco primeiro, que estarão dentro do raio do evento e
     * depois pegar os voluntários para grupos de ajuda de regiões mais amplas ao redor.
     */
    people.map((p) => {
      if (p.type === UserType.NORMAL) {
        peopleAtRisk.push(p);
      } else if (p.type === UserType.VOLUNTEER) {
        volunteerPeople.push(p);
      } else {
        this.logger.warn(
          `Pessoa de tipo incorreto para atribuição de grupo de ajuda ou notificação de risco: ${p.type}`,
        );
      }
    });

    const helpGroups = this.processHelpGroups(volunteerPeople);

    /**
     * O ideal aqui também é trabalhar com filas e workers para tratar cada grupo em separado para notificações.
     *
     * Para V1, retornarei o objeto inteiro dessa forma.
     */
    return { people_at_risk: peopleAtRisk, help_groups: helpGroups };
  }

  /**
   * Calcula as coordenadas mínimas e máximas para obtenção das pessoas para notificação e formação dos grupos de ajuda.
   * @param impactRadius
   * @param eventLatitude
   * @param eventLongitude
   * @returns
   */
  processCoordinates(
    impactRadius: number,
    eventLatitude: number,
    eventLongitude: number,
  ) {
    const circumferenceEarth = 40075 * 1000; //circunferência da terra em metros;
    /**
     * A terra tem 40.075Km de circunfêrencia no equador.
     *
     * Latitude e longitude NÃO são medidas em metros, mas sim em graus, então,
     * precisamos descobrir quanto equivale 1 grau da circunferência da terra.
     *
     * Para descobrir isso, pelo fato da terra ser redonda, dividimos por 360, que é 360º e representa uma esfera.
     *
     * Com isso, temos quanto equivale 1 grau da terra, que seria aproximadamente 111000 metros ou 111km.
     *
     * Depois usamos isso para descobrir quantos graus o RAIO DO EVENTO equivale, dividindo o raio pelo grau da terra.
     *
     */
    const metersPerDegreeLatitude = circumferenceEarth / 360; // aproximação da quantidade de metros em 1 grau de latitude na Terra

    const radiusMeters = impactRadius * 1000;

    const latDelta = radiusMeters / metersPerDegreeLatitude;
    const lonDelta =
      radiusMeters /
      (metersPerDegreeLatitude * Math.cos((eventLatitude * Math.PI) / 180));

    const minLat = eventLatitude - latDelta;
    const maxLat = eventLatitude + latDelta;
    const minLon = eventLongitude - lonDelta;
    const maxLon = eventLongitude + lonDelta;

    return [minLat, maxLat, minLon, maxLon, radiusMeters];
  }

  /**
   * Calcula os grupos de voluntários.
   *
   * Regras:
   * - cada grupo começa com até 5 voluntários;
   * - se o último grupo tiver menos de 3 pessoas, ele é anexado ao grupo anterior;
   * - se houver 7 voluntários ou menos, todos ficam em um único grupo.
   *
   * @param volunteers Lista de voluntários
   * @returns Lista de grupos de voluntários
   */
  processHelpGroups(volunteers: UserEntity[]): UserEntity[][] {
    if (volunteers.length === 0) {
      return [];
    }

    if (volunteers.length <= 7) {
      return [volunteers];
    }

    const helpGroups: UserEntity[][] = [];

    for (let i = 0; i < volunteers.length; i += 5) {
      helpGroups.push(volunteers.slice(i, i + 5));
    }

    if (helpGroups.length > 1) {
      // Verifica a quantidade de pessoas do último grupo formado.
      // O ideal é ter pelo menos 3 pessoas por grupo.
      const lastGroup = helpGroups[helpGroups.length - 1];

      if (lastGroup.length < 3) {
        helpGroups[helpGroups.length - 2].push(...lastGroup);
        helpGroups.pop();
      }
    }

    return helpGroups;
  }
}
