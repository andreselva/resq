import { UserType } from "src/enums/user-type.enum";
import EntityModel from "./entity.model";
import IEntity from "src/shared/interfaces/IEntity";
import { UserDTO } from "src/dtos/user.dto";

export class UserEntity extends EntityModel implements IEntity {
    public id?: number = 0;
    public name: string;
    public cpf: string;
    public cellphone: string;
    public type: UserType = UserType.NORMAL;
    public latitude: number;
    public longitude: number;
    public created_at: string;
    public status: number = 1;

    public getPrimaryKey(): string {
        return 'id';
    }

    public getTableName(): string {
        return 'user';
    }

    public static fromDTO(dto: UserDTO) {
        const user = new UserEntity();
        user.name = dto.name;
        user.cpf = dto.cpf;
        user.cellphone = dto.cellphone;
        user.type = dto.type;
        user.latitude = dto.latitude;
        user.longitude = dto.longitude;
        return user;
    }
}