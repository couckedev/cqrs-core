export interface CommandBusPort<CommandType=unknown> {
    execute(command: CommandType): void | Promise<void>;
}
