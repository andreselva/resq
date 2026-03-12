import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities/user-entity";
import BaseRepository from "src/shared/repositories/base.repository";
import MySQLDatabase from "../database/mysql-database";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(database: MySQLDatabase) {
        super(database)
    }

    async getAllUsers() {
        const query = `SELECT * FROM users`;
    }

    async saveUser(user: UserEntity) {
        const insert = `INSERT INTO users (name, cpf, cellphone, type, location, active) VALUES (?, ?, ?, ?, ST_SRID(POINT(?, ?), 4326), ?)`;
        const result = await this.database.execute(insert, [
            user.name,
            user.cpf,
            user.cellphone,
            user.type,
            user.longitude,
            user.latitude, 
            user.active
        ])
        
        if (result.insertId > 0) {
            user.id = result.insertId
        }
        return user;
    }
}