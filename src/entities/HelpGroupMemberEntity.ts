import { HelpGroupMemberRoleEnum } from "src/enums/help-group-member-role.enum";
import EntityModel from "./EntityModel";
import IEntity from "src/shared/interfaces/IEntity";

export class HelpGroupMemberEntity extends EntityModel implements IEntity {
    public id?: number;
    public group_id: number;
    public user_id: number;
    public role: HelpGroupMemberRoleEnum;
    public created_at: string;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'help_group_member';
    }

}