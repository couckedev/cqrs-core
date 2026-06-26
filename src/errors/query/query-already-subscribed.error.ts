export class QueryAlreadySubscribedError extends Error {
  constructor(queryName: string) {
    super(`Query ${queryName} already subscribed`);
  }
}
