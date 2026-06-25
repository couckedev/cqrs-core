import type { CommandBus } from "../../../ports/index.js";
import type { Command, IHandler } from "../../../types/index.js";

export class InMemoryEventBus implements CommandBus {
  private _subscriptions = new Map<string, IHandler<unknown>[]>();
  subscribe<
    CommandType extends Command,
    HandlerType extends IHandler<CommandType>,
  >(commandName: string, handler: HandlerType): void {
    const existingHandlers = this._subscriptions.get(commandName) ?? [];
    const handlersToSet = [...existingHandlers, handler];
    this._subscriptions.set(commandName, handlersToSet);
  }
  execute<CommandType extends Command>(event: CommandType): void {
    const handlers = this._subscriptions.get(
      event.name,
    ) as IHandler<CommandType>[];
    for (const handler of handlers) {
      handler.handle(event);
    }
  }
}
