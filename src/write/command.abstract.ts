export abstract class AbstractCommand {
  public readonly createdAt: Date = new Date();

  abstract get commandName (): string;
}