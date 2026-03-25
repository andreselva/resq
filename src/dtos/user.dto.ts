import {
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { UserType } from 'src/enums/user-type.enum';

export class UserDTO {
  @IsOptional()
  @IsInt({ message: 'Invalid ID. Must be a number.' })
  id?: number;

  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsString({ message: 'CPF must be a string.' })
  @Length(11, 11, { message: 'CPF must contain 11 digits.' })
  cpf: string;

  @IsString({ message: 'Cellphone must be a string.' })
  @IsNotEmpty({ message: 'Cellphone cannot be empty.' })
  cellphone: string;

  @IsEnum(UserType, {
    message: 'Invalid user type. Must be VOLUNTEER, NORMAL OR ADMIN',
  })
  type: UserType;

  @IsLatitude({ message: 'Invalid latitude.' })
  latitude: number;

  @IsLongitude({ message: 'Invalid longitude.' })
  longitude: number;
}
