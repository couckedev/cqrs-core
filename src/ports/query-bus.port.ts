import type { IHandler, Query } from "../types/index.js";

export interface QueryBus {
  execute<QueryType extends Query, ReturnType>(query: QueryType): ReturnType;
  subscribe<QueryType extends Query, HandlerType extends IHandler<QueryType>>(
    queryName: string,
    handler: HandlerType,
  ): void;
}
