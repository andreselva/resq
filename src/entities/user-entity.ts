import { UserType } from 'src/enums/user-type.enum';
import EntityModel from './entity.model';
import IEntity from 'src/shared/interfaces/IEntity';
import { UserDTO } from 'src/dtos/user.dto';
import { IUserRow } from 'src/shared/interfaces/user-row.interface';

export class UserEntity extends EntityModel implements IEntity {
  public id?: number = 0;
  public name: string;
  public cpf: string;
  public cellphone: string;
  public type: UserType = UserType.NORMAL;
  public latitude: number;
  public longitude: number;
  public created_at: string;
  public active: number = 1;

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

  public static fromRow(i: IUserRow) {
    const user = new UserEntity();
    user.id = i.id;
    user.name = i.name;
    user.cpf = i.cpf;
    user.cellphone = i.cellphone;
    user.type = i.type;
    user.latitude = i.latitude;
    user.longitude = i.longitude;
    user.created_at = i.created_at;
    user.active = i.active;
    return user;
  }
}
