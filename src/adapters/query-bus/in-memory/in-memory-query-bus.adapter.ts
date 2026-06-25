import {
  QueryAlreadySubscribedError,
  QueryNotSubscribedError,
} from "../../../errors/index.js";
import type { QueryBus } from "../../../ports/index.js";
import type { IHandler, Query } from "../../../types/index.js";

export class InMemoryQueryBus implements QueryBus {
  private _subscriptions = new Map<string, IHandler<unknown>>();
  subscribe<QueryType extends Query, HandlerType extends IHandler<QueryType>>(
    queryName: string,
    handler: HandlerType,
  ): void {
    const existingHandler = this._subscriptions.get(queryName);
    if (existingHandler) {
      throw new QueryAlreadySubscribedError(queryName);
    }
    this._subscriptions.set(queryName, handler);
  }
  execute<QueryType extends Query, ReturnType>(query: QueryType): ReturnType {
    const handler = this._subscriptions.get(query.name) as IHandler<QueryType>;
    if (!handler) {
      throw new QueryNotSubscribedError(query.name);
    }
    return handler.handle<ReturnType>(query);
  }
}
