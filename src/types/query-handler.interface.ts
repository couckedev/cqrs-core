export interface IQueryHandler<Query> {
  execute<ReturnType>(query: Query): ReturnType;
}
