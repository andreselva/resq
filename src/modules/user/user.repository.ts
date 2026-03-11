import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities/user-entity";
import BaseRepository from "src/shared/repositories/base.repository";
import MySQLDatabase from "../database/mysql-database";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(database: MySQLDatabase) {
        super(database)
    }
}