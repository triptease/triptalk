import { App } from '../src/App';
import fetch from 'node-fetch';
import { Message } from '../src/Message';

describe('Message', () => {
  test('Creates and retrieves all messages', async () => {
    const port = 6000;
    const app = new App(port);
    await app.start();

    const message1 = 'message-' + Math.round(Math.random() * 1_000_000_000);
    const message2 = 'message-' + Math.round(Math.random() * 1_000_000_000);

    try {
      const postResult1 = await fetch(`http://localhost:${port}/messages`, {
        method: 'POST',
        body: message1,
      });
      expect(postResult1.status).toBe(201);

      const postResult2 = await fetch(`http://localhost:${port}/messages`, {
        method: 'POST',
        body: message2,
      });
      expect(postResult2.status).toBe(201);

      const getResult = await fetch(`http://localhost:${port}/messages`, { method: 'GET' });

      expect(getResult.status).toBe(200);
      const messages = await getResult.json();

      expect(messages).toEqual(
        expect.arrayContaining([
          {
            id: expect.stringMatching(/^.+$/),
            message: message1,
            liked: false,
          },
          {
            id: expect.stringMatching(/^.+$/),
            message: message2,
            liked: false,
          },
        ]),
      );
    } finally {
      await app.stop();
    }
  });

  test('Like a message', async () => {
    const port = 6000;
    const app = new App(port);
    await app.start();

    const message1 = 'message-' + Math.round(Math.random() * 1_000_000_000);
    const message2 = 'message-' + Math.round(Math.random() * 1_000_000_000);

    try {
      await fetch(`http://localhost:${port}/messages`, {
        method: 'POST',
        body: message1,
      });
      await fetch(`http://localhost:${port}/messages`, {
        method: 'POST',
        body: message2,
      });

      const messages: Message[] = await (await fetch(`http://localhost:${port}/messages`, { method: 'GET' })).json();

      const likedMessage = messages[0];
      const unlikedMessage = messages[1];

      const likeMessageResponse = await fetch(`http://localhost:${port}/messages/${likedMessage.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ liked: true }),
      });
      expect(likeMessageResponse.status).toBe(204);

      const updatedMessages = await (await fetch(`http://localhost:${port}/messages`, { method: 'GET' })).json();

      expect(updatedMessages).toEqual(
        expect.arrayContaining([
          {
            id: likedMessage.id,
            message: likedMessage.message,
            liked: true,
          },
          {
            id: unlikedMessage.id,
            message: unlikedMessage.message,
            liked: false,
          },
        ]),
      );
    } finally {
      await app.stop();
    }
  });
});
