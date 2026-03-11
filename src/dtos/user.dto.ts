import { UserType } from "src/enums/user-type.enum";

export class UserDTO {
    id?: number;
    name: string;
    cpf: string;
    cellphone: string;
    type: UserType;
    latitude: number;
    longitude: number;
}