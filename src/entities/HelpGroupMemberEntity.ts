import { HelpGroupMemberRoleEnum } from "src/enums/help-group-member-role.enum";

export class HelpGroupMemberEntity {
    public id?: number;
    public group_id: number;
    public user_id: number;
    public role: HelpGroupMemberRoleEnum;
    public created_at: string;
}