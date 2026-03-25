import EntityModel from 'src/entities/entity.model';
import MySQLDatabase from 'src/modules/database/mysql-database';
import IEntity from '../interfaces/IEntity';
import { IEntityFactory } from '../interfaces/IEntityFactory';
import DataMapper from '../mapper/data-mapper';
import QueryBuilder from '../query-builder/query.builder';

export default abstract class BaseRepository<T extends EntityModel> {
  constructor(protected readonly database: MySQLDatabase) {}

  async save(entity: IEntity) {
    const { sql, values } = QueryBuilder.buildQuery(
      entity as unknown as Record<string, unknown>,
      entity.getTableName(),
      entity.getPrimaryKey(),
    );

    const result = await this.database.execute(sql, values as object[]);

    if (
      'id' in entity &&
      (entity.id === 0 || entity.id === null || entity.id === undefined) &&
      result.insertId > 0
    ) {
      entity.id = result.insertId;
    }

    return result;
  }

  extractToEntity(rows: object[], entity: IEntityFactory<T>): T[] {
    return DataMapper.toEntities(rows, entity);
  }
}
