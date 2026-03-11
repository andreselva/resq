import { EventStatusEnum } from "src/enums/event-status.enum";
import { EventTypeEnum } from "src/enums/event-type.enum";

export class EventDTO {
    id?: number;
    type: EventTypeEnum;
    description: string;
    latitude: number;
    longitude: number;
    impact_radius: number;
    status: EventStatusEnum;
}