import { Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly service: EventsService) {}

    @Post()
    async createEvent() {
        
    }
}
