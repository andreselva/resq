import MySQLDatabase from "src/modules/database/mysql-database";
import QueryBuilder from "../query-builder/query.builder";
import IEntity from "../interfaces/IEntity";
import { IEntityFactory } from "../interfaces/IEntityFactory";
import DataMapper from "../mapper/data-mapper";
import EntityModel from "src/entities/entity.model";

export default abstract class BaseRepository<T extends EntityModel> {
    constructor(
        protected readonly database: MySQLDatabase,
    ) {}

    async save(entity: IEntity) {
        const { sql, values } = QueryBuilder.buildQuery(entity, entity.getTableName(), entity.getPrimaryKey());
        const result = await this.database.execute(sql, values);
        if ('id' in entity && (entity.id === 0 || entity.id === null || entity.id === undefined) && result.insertId > 0) {
            entity.id = result.insertId;
        }
        return result;
    }

    extractToEntity(rows: any, entity: IEntityFactory<T>): T[] {
        return DataMapper.toEntities(rows, entity)
    }
}