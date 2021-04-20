export interface MessageClient {
  get: () => Promise<string>;
  create: (newMessage: string) => Promise<void>;
}