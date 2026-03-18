export interface QueryBusPort {
  execute<QueryType, ResultType>(query: QueryType): Promise<ResultType>;
}
