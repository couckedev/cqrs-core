export interface IEventHandler<Event> {
  handle(event: Event): void;
}
