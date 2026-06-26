import type { Command, ICommandHandler } from "../types/index.js";

export interface CommandBus {
  execute<CommandType extends Command>(command: CommandType): Promise<void>;
  subscribe<
    CommandType extends Command,
    HandlerType extends ICommandHandler<CommandType>,
  >(
    commandName: string,
    handler: HandlerType,
  ): void;
}
