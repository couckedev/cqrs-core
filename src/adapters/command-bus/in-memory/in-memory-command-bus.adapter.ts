import {
  CommandAlreadySubscribedError,
  CommandNotSubscribedError,
} from "../../../errors/index.js";
import type { CommandBus } from "../../../ports/index.js";
import type { Command, IHandler } from "../../../types/index.js";

export class InMemoryCommandBus implements CommandBus {
  private _subscriptions = new Map<string, IHandler<unknown>>();
  subscribe<
    CommandType extends Command,
    HandlerType extends IHandler<CommandType>,
  >(commandName: string, handler: HandlerType): void {
    const existingHandler = this._subscriptions.get(commandName);
    if (existingHandler) {
      throw new CommandAlreadySubscribedError(commandName);
    }
    this._subscriptions.set(commandName, handler);
  }
  execute<CommandType extends Command>(command: CommandType): void {
    const handler = this._subscriptions.get(
      command.name,
    ) as IHandler<CommandType>;
    if (!handler) {
      throw new CommandNotSubscribedError(command.name);
    }
    handler.handle(command);
  }
}
