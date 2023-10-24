import { Message } from 'server/src/Message';

export type UUID = string;


export { Message };
export interface MessageClient {
  get: () => Promise<Array<Message>>;
  create: (newMessage: string) => Promise<void>;
  like: (messageId: UUID) => Promise<void>;
}
