import { EventStatusEnum } from "src/enums/event-status.enum";
import { EventTypeEnum } from "src/enums/event-type.enum";
import EntityModel from "./entity.model";
import IEntity from "src/shared/interfaces/IEntity";
import { EventDTO } from "src/dtos/event.dto";

export class EventEntity extends EntityModel implements IEntity {
    public id?: number;
    public type: EventTypeEnum;
    public description: string;
    public latitude: number;
    public longitude: number;
    public impact_radius: number;
    public status: EventStatusEnum = EventStatusEnum.PENDING
    public created_by_user_id: number = 0;
    public created_at: string;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'event';
    }

    static fromDTO(dto: EventDTO) {
        const event = new EventEntity();
        event.type = dto.type;
        event.description = dto.description;
        event.latitude = dto.latitude;
        event.longitude = dto.longitude;
        event.impact_radius = dto.impact_radius;
        event.status = dto.status;
        return event;
    }
}