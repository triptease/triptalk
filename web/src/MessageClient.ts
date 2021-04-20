export type UUID = string;

export type Message = {
  id: UUID,
  message: string,
}

export interface MessageClient {
  get: () => Promise<Array<Message>>;
  create: (newMessage: string) => Promise<void>;
}