export interface ICommandHandler<CommandType> {
  execute(command: CommandType): void | Promise<void>;
}
