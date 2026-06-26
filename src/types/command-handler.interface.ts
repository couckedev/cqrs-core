export interface ICommandHandler<Command> {
  execute(command: Command): void;
}
