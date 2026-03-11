import { UserType } from "src/enums/user-type.enum";

export class UserEntity {
    public id?: number = 0;
    public name: string;
    public cpf: string;
    public cellphone: string;
    public type: UserType = UserType.RISK;
    public latitude: number;
    public longitude: number;
    public created_at: string;
}