import fetch from 'isomorphic-fetch';
import { Message, MessageClient, UUID } from './MessageClient';

export class MessageClientHttp implements MessageClient {
  constructor(private readonly baseUrl: string) {}

  async create(newMessage: string): Promise<void> {
    await fetch(`${this.baseUrl}/messages`, { method: 'POST', body: newMessage });
  }

  async get(): Promise<Array<Message>> {
    const messages = await fetch(`${this.baseUrl}/messages`, { method: 'GET' }).then((response) => response.json());

    return Promise.resolve(messages);
  }

  like(_: UUID): Promise<void> {
    return Promise.resolve(undefined);
  }
}
