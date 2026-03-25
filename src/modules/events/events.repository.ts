import { EventEntity } from 'src/entities/event-entity';
import BaseRepository from 'src/shared/repositories/base.repository';
import MySQLDatabase from '../database/mysql-database';
import { Injectable } from '@nestjs/common';
import DataMapper from 'src/shared/mapper/data-mapper';
import { UserEntity } from 'src/entities/user-entity';

@Injectable()
export class EventsRepository extends BaseRepository<EventEntity> {
  constructor(database: MySQLDatabase) {
    super(database);
  }

  async saveEvent(event: EventEntity) {
    const insert = `INSERT INTO events (type, description, location, impact_radius, status) VALUES (?, ?, ST_SRID(POINT(?, ?), 4326), ?, ?)`;
    const result = await this.database.execute(insert, [
      event.type,
      event.description,
      event.longitude,
      event.latitude,
      event.impact_radius,
      event.status,
    ]);

    if (result.insertId > 0) {
      event.id = result.insertId;
    }
    return event;
  }

  async getPeople(
    event: EventEntity,
    minLon: number,
    maxLon: number,
    minLat: number,
    maxLat: number,
    radiusMeters: number,
  ) {
    const query = `SELECT
                            id,
                            name,
                            cpf,
                            cellphone,
                            type,
                            ST_Latitude(location) AS latitude,
                            ST_Longitude(location) AS longitude,
                            active,
                            created_at,
                            ST_Distance_Sphere(
                                location,
                                ST_SRID(POINT(?, ?), 4326)
                            ) AS distance_m
                        FROM users
                            WHERE active = 1
                            AND type IN ('VOLUNTEER', 'NORMAL')
                            AND ST_Longitude(location) BETWEEN ? AND ?
                            AND ST_Latitude(location) BETWEEN ? AND ?
                        HAVING distance_m <= ?
                        ORDER BY distance_m ASC;`;
    const result = await this.database.select(query, [
      event.longitude,
      event.latitude,
      minLon,
      maxLon,
      minLat,
      maxLat,
      radiusMeters,
    ]);

    return DataMapper.toEntities(result, UserEntity);
  }
}
