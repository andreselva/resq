import { Injectable } from '@nestjs/common';
import { EventDTO } from 'src/dtos/event.dto';
import { EventEntity } from 'src/entities/event-entity';
import { EventsRepository } from './events.repository';
import { EventsProcessorService } from './events-processor.service';
import { UserEntity } from 'src/entities/user-entity';

@Injectable()
export class EventsService {
    constructor(
        private readonly repository: EventsRepository,
        private readonly processor: EventsProcessorService
    ) {}

    async saveEvent(dto: EventDTO) {
        const entity = EventEntity.fromDTO(dto);
        const result = await this.repository.saveEvent(entity) as EventEntity;
        if (result instanceof EventEntity && result.id !== undefined && result.id > 0) {
           return await this.processor.process(result)
        }
    }
}
