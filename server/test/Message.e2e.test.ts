import { App } from '../src/App';
import fetch from 'node-fetch';

describe('Message', () => {
  it('Creates and retrieves a message', async () => {
    const port = 6000;
    const app = new App(port);
    await app.start();
    const message = 'Hello World!';

    const postResult = await fetch(`http://localhost:${port}/messages`, { method: 'POST', body: message });
    expect(postResult.status).toBe(201);

    const getResult = await fetch(`http://localhost:${port}/message`, { method: 'GET' });
    expect(getResult.status).toBe(200);
    expect(await getResult.text()).toBe(message);

    await app.stop();
  });
});
