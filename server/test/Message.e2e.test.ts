import { App } from '../src/App';
import fetch from 'node-fetch';

describe('Message', () => {
  it('Creates and retrieves a message', async () => {
    const port = 6000;
    const app = new App(port);
    await app.start();
    const message = 'Hello World!';

    await fetch(`http://localhost:${port}/messages`, { method: 'POST', body: message });
    const response = await fetch(`http://localhost:${port}/message`, { method: 'GET' });

    await app.stop();

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(message);
  });
});
