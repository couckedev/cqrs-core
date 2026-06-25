import { describe, expect, it } from "vitest";
import type { Event, IHandler } from "../../../types/index.js";
import { InMemoryEventBus } from "./in-memory-event-bus.adapter.js";

describe("In memory event bus adapter", () => {
  describe("execute", () => {
    it("should dispatch event on bus and execute its handlers", () => {
      const eventBus = new InMemoryEventBus();
      const executedHandlers = {
        handler1: false,
        handler2: false,
        handler3: false,
      };
      const handler1 = {
        handle: async () => {
          executedHandlers.handler1 = true;
        },
      } as IHandler<Event>;
      const handler2 = {
        handle: async () => {
          executedHandlers.handler2 = true;
        },
      } as IHandler<Event>;
      const handler3 = {
        handle: async () => {
          executedHandlers.handler3 = true;
        },
      } as IHandler<Event>;
      const event: Event = {
        name: "Event",
      };
      eventBus.subscribe(event.name, handler1);
      eventBus.subscribe(event.name, handler2);
      eventBus.subscribe(event.name, handler3);

      eventBus.execute(event);

      expect(executedHandlers.handler1).toBeTruthy();
      expect(executedHandlers.handler2).toBeTruthy();
      expect(executedHandlers.handler3).toBeTruthy();
    });
  });
});
