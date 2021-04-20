import { App } from '../src/App';
import fetch from 'node-fetch';

describe('Message', () => {
  it('Creates and retrieves all messages', async () => {
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
          },
          {
            id: expect.stringMatching(/^.+$/),
            message: message2,
          },
        ]),
      );
    } finally {
      await app.stop();
    }
  });
});
