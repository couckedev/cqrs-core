import type { Event, IHandler } from "../types/index.js";

export interface EventBus {
  publish<EventType extends Event, ReturnType>(event: EventType): ReturnType;
  subscribe<EventType extends Event, HandlerType extends IHandler<EventType>>(
    eventName: string,
    handler: HandlerType,
  ): void;
}
