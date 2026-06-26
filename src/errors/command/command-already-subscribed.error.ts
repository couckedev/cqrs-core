export class CommandAlreadySubscribedError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} already subscribed`);
  }
}
