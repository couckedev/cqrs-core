export interface IEventHandler<EventType> {
  handle(event: EventType): Promise<void>;
}
