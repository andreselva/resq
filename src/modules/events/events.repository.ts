import { EventEntity } from "src/entities/event-entity";
import BaseRepository from "src/shared/repositories/base.repository";
import MySQLDatabase from "../database/mysql-database";
import { Injectable } from "@nestjs/common";
import DataMapper from "src/shared/mapper/data-mapper";
import { UserEntity } from "src/entities/user-entity";

@Injectable()
export class EventsRepository extends BaseRepository<EventEntity> {
    constructor(database: MySQLDatabase) {
        super(database);
    }

    async getVolunteersForEvent(
        event: EventEntity, 
        minLon: number, 
        maxLon: number, 
        minLat: number, 
        maxLat: number, 
        radiusMeters: number) 
    {
        const query = `SELECT
                            id, name, cpf, cellphone, type, ST_Y(location) as latitude, ST_X(location) as longitude,
                            active, created_at,
                            ST_Distance_Sphere(
                                location,
                                ST_SRID(POINT(?, ?), 4326)
                            ) AS distance_m
                        FROM users
                        WHERE is_available = TRUE
                        AND MBRContains(
                                ST_MakeEnvelope(
                                    ST_SRID(POINT(?, ?), 4326),
                                    ST_SRID(POINT(?, ?), 4326)
                                ),
                                location
                            )
                        HAVING distance_m <= ?
                        ORDER BY distance_m ASC;`
        const result = await this.database.select(query, [
            event.longitude, 
            event.latitude, 
            minLon, 
            minLat, 
            maxLon, 
            maxLat, 
            radiusMeters
        ]);

        return DataMapper.toEntities(result, UserEntity);
    }
}