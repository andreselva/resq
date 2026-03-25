import {
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventStatusEnum } from 'src/enums/event-status.enum';
import { EventTypeEnum } from 'src/enums/event-type.enum';

export class EventDTO {
  @IsOptional()
  @IsInt({ message: 'Invalid id! Must be a number.' })
  id?: number;

  @IsEnum(EventTypeEnum, {
    message: 'Invalid type. Must be CLIMATE_DISASTER, FLOOD OR THUNDERSTORM',
  })
  @IsNotEmpty({ message: 'type cannot be empty' })
  type: EventTypeEnum;

  @IsString({ message: 'Invalid description. Must be a string.' })
  @IsNotEmpty({ message: 'description cannot by empty' })
  description: string;

  @IsLatitude({ message: 'latitude must be a number' })
  latitude: number;

  @IsLongitude({ message: 'longitude must be a number' })
  longitude: number;

  @IsNumber({}, { message: 'impact_radius must be a number' })
  @IsNotEmpty({ message: 'impact_radius cannot by empty' })
  impact_radius: number;

  @IsEnum(EventStatusEnum, {
    message: 'Invalid status. Must by PENDING, ACTIVE OR CLOSED',
  })
  @IsNotEmpty({ message: 'status cannot by empty' })
  status: EventStatusEnum;
}
