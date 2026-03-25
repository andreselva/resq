import { Global, Module } from '@nestjs/common';
import MySQLDatabase from './mysql-database';

@Global()
@Module({
  providers: [MySQLDatabase],
  exports: [MySQLDatabase],
})
export class DatabaseModule {}
