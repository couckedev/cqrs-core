import type { EventBus } from "../../../ports/index.js";
import type { Event, IEventHandler } from "../../../types/index.js";

export class InMemoryEventBus implements EventBus {
  private _subscriptions = new Map<string, IEventHandler<unknown>[]>();
  subscribe<
    EventType extends Event,
    HandlerType extends IEventHandler<EventType>,
  >(eventName: string, handler: HandlerType): void {
    const existingHandlers = this._subscriptions.get(eventName) ?? [];
    const handlersToSet = [...existingHandlers, handler];
    this._subscriptions.set(eventName, handlersToSet);
  }
  publish<EventType extends Event>(event: EventType): void {
    const handlers = this._subscriptions.get(
      event.name,
    ) as IEventHandler<EventType>[];
    for (const handler of handlers) {
      handler.handle(event);
    }
  }
}
