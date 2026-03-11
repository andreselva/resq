import { HelpGroupStatusEnum } from "src/enums/help-group-status.enum";
import EntityModel from "./EntityModel";
import IEntity from "src/shared/interfaces/IEntity";

export class HelpGroupEntity extends EntityModel implements IEntity {
    public id?: number;
    public event_id: number;
    public leader_user_id: number;
    public meeting_lat: number;
    public meeting_lng: number;
    public status: HelpGroupStatusEnum = HelpGroupStatusEnum.FORMING;
    public created_at: string;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'help_group';
    }
}