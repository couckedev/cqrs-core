export abstract class AbstractQuery {
  public readonly createdAt: Date = new Date();

  abstract get queryName (): string;
}