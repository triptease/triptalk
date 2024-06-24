import { Message, UUID } from '@triptalk/shared';

export interface MessageClient {
  get: () => Promise<Array<Message>>;
  create: (newMessage: string) => Promise<void>;
  like: (messageId: UUID) => Promise<void>;
}
