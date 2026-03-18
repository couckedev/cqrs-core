export interface EventBusPort<EventType=unknown> {
    publish(event: EventType): void | Promise<void>;
}
