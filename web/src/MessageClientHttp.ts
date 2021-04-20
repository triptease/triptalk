import fetch from 'isomorphic-fetch';
import { MessageClient } from './MessageClient';

export class MessageClientHttp implements MessageClient {
  constructor(private readonly baseUrl: string) {}

  async create(newMessage: string): Promise<void> {
    await fetch(`${this.baseUrl}/messages`, { method: 'POST', body: newMessage });
  }

  get(): Promise<string> {
    const message = fetch(`${this.baseUrl}/message`, { method: 'GET' }).then((response) => response.text());
    return Promise.resolve(message);
  }
}
