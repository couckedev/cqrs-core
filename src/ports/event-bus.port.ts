import type { Event, IEventHandler } from "../types/index.js";

export interface EventBus {
  publish<EventType extends Event>(event: EventType): void;
  subscribe<
    EventType extends Event,
    HandlerType extends IEventHandler<EventType>,
  >(
    eventName: string,
    handler: HandlerType,
  ): void;
}
