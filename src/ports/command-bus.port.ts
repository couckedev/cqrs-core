import type { Command, IHandler } from "../types/index.js";

export interface CommandBus {
  execute<CommandType extends Command>(command: CommandType): void;
  subscribe<
    CommandType extends Command,
    HandlerType extends IHandler<CommandType>,
  >(
    commandName: string,
    handler: HandlerType,
  ): void;
}
