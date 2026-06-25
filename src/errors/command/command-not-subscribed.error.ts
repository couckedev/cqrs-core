export class CommandNotSubscribedError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} not subscribed`);
  }
}
