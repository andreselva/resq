import { Injectable } from '@nestjs/common';
import { EventDTO } from 'src/dtos/event.dto';
import { EventEntity } from 'src/entities/event-entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
    constructor(private readonly repository: EventsRepository) {}

    async saveEvent(dto: EventDTO) {
        const entity = EventEntity.fromDTO(dto);
        await this.repository.save(entity);
    }
}
