import { UserType } from 'src/enums/user-type.enum';

export interface IUserRow {
  id: number;
  name: string;
  cpf: string;
  cellphone: string;
  type: UserType;
  latitude: number;
  longitude: number;
  active: number;
  created_at: string;
}
