export type UUID = string;

export type Message = {
  id: UUID;
  message: string;
  liked: boolean;
};

export interface MessageClient {
  get: () => Promise<Array<Message>>;
  create: (newMessage: string) => Promise<void>;
  like: (messageId: UUID) => Promise<void>;
}
