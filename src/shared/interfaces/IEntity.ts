export default interface IEntity {
  getTableName(): string;
  getPrimaryKey(): string;
}
