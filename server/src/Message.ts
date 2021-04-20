export type UUID = string;

export type Message = {
  id: UUID;
  message: string;
  liked: boolean;
};