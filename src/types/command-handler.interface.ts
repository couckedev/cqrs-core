export interface ICommandHandler<Command> {
  execute(command: Command): Promise<void>;
}
