import { Injectable } from "@nestjs/common";
import { EventsRepository } from "./events.repository";

@Injectable()
export class EventsProcessorService {
    constructor(private readonly repository: EventsRepository) {}

    async process(eventId: number) {
        
    }
}