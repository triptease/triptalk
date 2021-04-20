import { App } from '../src/App';
import fetch from 'node-fetch';

describe('Message', () => {
  it('Creates and retrieves all message', async () => {
    const port = 6000;
    const app = new App(port);
    await app.start();

    const message = 'message-' + Math.round(Math.random() * 1_000_000_000);

    try {
      const postResult = await fetch(`http://localhost:${port}/messages`, {
        method: 'POST',
        body: message,
      });
      expect(postResult.status).toBe(201);

      const getResult = await fetch(`http://localhost:${port}/messages`, { method: 'GET' });

      expect(getResult.status).toBe(200);
      const messages = await getResult.json();
      expect(messages).toContainEqual({
        id: expect.stringMatching(/^.+$/),
        message,
      });
    } finally {
      await app.stop();
    }
  });
});
