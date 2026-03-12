import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { DatabaseModule } from './modules/database/database.module';
import { GroupsModule } from './modules/groups/groups.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule, 
    GroupsModule, 
    UserModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
