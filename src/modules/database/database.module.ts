import { Module } from '@nestjs/common';
import MySQLDatabase from './mysql-database';

@Module({
    providers: [MySQLDatabase],
    exports: [MySQLDatabase]
})

export class DatabaseModule {}
