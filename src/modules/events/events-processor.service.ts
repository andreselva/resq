import { Injectable } from "@nestjs/common";
import { EventsRepository } from "./events.repository";
import { EventEntity } from "src/entities/event-entity";

@Injectable()
export class EventsProcessorService {
    constructor(private readonly repository: EventsRepository) {}

    async process(event: EventEntity) {
        const approximateLatitude = 111320;
        const radiusMeters = event.impact_radius * 1000;

        const latDelta = radiusMeters / approximateLatitude;
        const lonDelta = radiusMeters / (
            approximateLatitude * Math.cos(event.latitude * Math.PI / 180)
        );
        
        const minLat = event.latitude - latDelta;
        const maxLat = event.latitude + latDelta;
        const minLon = event.longitude - lonDelta;
        const maxLon = event.longitude + lonDelta;

        const volunteers = await this.repository.getVolunteersForEvent(
            event,
            minLon,
            maxLon,
            minLat,
            maxLat,
            radiusMeters
        );

        if (volunteers.length > 0) {
            console.log(volunteers);
        }
    }
}