import type { IQueryHandler, Query } from "../types/index.js";

export interface QueryBus {
  execute<QueryType extends Query, ReturnType>(query: QueryType): ReturnType;
  subscribe<
    QueryType extends Query,
    HandlerType extends IQueryHandler<QueryType>,
  >(
    queryName: string,
    handler: HandlerType,
  ): void;
}
