import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';

@Module({
  providers: [VolunteersService]
})
export class VolunteersModule {}
