export interface IHandler<MessageType> {
  handle<ReturnType>(message: MessageType): ReturnType;
}
