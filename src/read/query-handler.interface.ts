export interface IQueryHandler<QueryType, ResultType> {
  execute(query: QueryType): Promise<ResultType>;
}
