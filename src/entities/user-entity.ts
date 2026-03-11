import { UserType } from "src/enums/user-type.enum";
import EntityModel from "./entity.model";
import IEntity from "src/shared/interfaces/IEntity";

export class UserEntity extends EntityModel implements IEntity {
    public id?: number = 0;
    public name: string;
    public cpf: string;
    public cellphone: string;
    public type: UserType = UserType.NORMAL;
    public latitude: number;
    public longitude: number;
    public created_at: string;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'user';
    }
}