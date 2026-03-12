import { Body, Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDTO } from 'src/dtos/event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly service: EventsService) {}

    @Post()
    async createEvent(@Body() dto: EventDTO) {
        await this.service.saveEvent(dto);
    }
}
