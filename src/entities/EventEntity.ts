import { EventStatusEnum } from "src/enums/event-status.enum";
import { EventTypeEnum } from "src/enums/event-type.enum";
import EntityModel from "./EntityModel";
import IEntity from "src/shared/interfaces/IEntity";

export class EventEntity extends EntityModel implements IEntity {
    public id?: number;
    public type: EventTypeEnum;
    public description: string;
    public latitude: number;
    public longitude: number;
    public impact_radius: number;
    public status: EventStatusEnum = EventStatusEnum.PENDING
    public created_at: string;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'user';
    }
}