import { describe, expect, it } from "vitest";
import {
  QueryAlreadySubscribedError,
  QueryNotSubscribedError,
} from "../../../errors/index.js";
import type { IHandler, Query } from "../../../types/index.js";
import { InMemoryQueryBus } from "./in-memory-query-bus.adapter.js";

describe("In memory query bus adapter", () => {
  describe("subscribe", () => {
    it("should throw error if query is already handled", () => {
      const queryBus = new InMemoryQueryBus();
      const handler = {
        handle: async () => {},
      } as IHandler<Query>;
      queryBus.subscribe("Query", handler);

      const invalidSubscription = () => queryBus.subscribe("Query", handler);

      expect(invalidSubscription).toThrow(
        new QueryAlreadySubscribedError("Query"),
      );
    });
  });
  describe("execute", () => {
    it("should dispatch query on bus and execute its handler", () => {
      const queryBus = new InMemoryQueryBus();
      let executedHandler = false;
      let executedQuery: Query | null = null;
      const handler = {
        handle: async (query: Query) => {
          executedHandler = true;
          executedQuery = query;
        },
      } as IHandler<Query>;
      const query: Query = {
        name: "Query",
      };
      queryBus.subscribe(query.name, handler);

      queryBus.execute(query);

      expect(executedHandler).toBeTruthy();
      expect(executedQuery).toStrictEqual(query);
    });

    it("should throw error if query is not subscribed", () => {
      const queryBus = new InMemoryQueryBus();
      const query: Query = {
        name: "Query",
      };

      const execution = () => queryBus.execute(query);

      expect(execution).toThrow(new QueryNotSubscribedError(query.name));
    });
  });
});
