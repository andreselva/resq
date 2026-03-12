import { EventEntity } from "src/entities/event-entity";
import BaseRepository from "src/shared/repositories/base.repository";
import MySQLDatabase from "../database/mysql-database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsRepository extends BaseRepository<EventEntity> {
    constructor(database: MySQLDatabase) {
        super(database);
    }
}