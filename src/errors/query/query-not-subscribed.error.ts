export class QueryNotSubscribedError extends Error {
  constructor(queryName: string) {
    super(`Query ${queryName} not subscribed`);
  }
}
