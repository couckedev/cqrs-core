import {
  QueryAlreadySubscribedError,
  QueryNotSubscribedError,
} from "../../../errors/index.js";
import type { QueryBus } from "../../../ports/index.js";
import type { IQueryHandler, Query } from "../../../types/index.js";

export class InMemoryQueryBus implements QueryBus {
  private _subscriptions = new Map<string, IQueryHandler<unknown>>();
  subscribe<
    QueryType extends Query,
    HandlerType extends IQueryHandler<QueryType>,
  >(queryName: string, handler: HandlerType): void {
    const existingHandler = this._subscriptions.get(queryName);
    if (existingHandler) {
      throw new QueryAlreadySubscribedError(queryName);
    }
    this._subscriptions.set(queryName, handler);
  }
  async execute<QueryType extends Query, ReturnType>(
    query: QueryType,
  ): Promise<ReturnType> {
    const handler = this._subscriptions.get(
      query.name,
    ) as IQueryHandler<QueryType>;
    if (!handler) {
      throw new QueryNotSubscribedError(query.name);
    }
    return handler.execute<ReturnType>(query);
  }
}
