import { Message, UUID } from '@triptalk/shared';
import fetch from 'isomorphic-fetch';
import { MessageClient } from './MessageClient';

export class MessageClientHttp implements MessageClient {
  constructor(private readonly baseUrl: string) {}

  async create(newMessage: string): Promise<void> {
    await fetch(`${this.baseUrl}/messages`, { method: 'POST', body: newMessage });
  }

  async get(): Promise<Array<Message>> {
    const messages = await fetch(`${this.baseUrl}/messages`, { method: 'GET' }).then((response) => response.json());

    return Promise.resolve(messages);
  }

  async like(messageId: UUID): Promise<void> {
    await fetch(`${this.baseUrl}/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ liked: true }),
    });
  }
}
