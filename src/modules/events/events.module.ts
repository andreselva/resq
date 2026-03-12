import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { EventsProcessorService } from './events-processor.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, EventsProcessorService]
})
export class EventsModule {}
