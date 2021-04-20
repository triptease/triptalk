import { MessageClientHttp } from '../src/MessageClientHttp';
import fastify from 'fastify';

describe(`Use a remote message server`, () => {
  it(`Create a message`, async () => {
    let messageStore: string = 'no message';

    const server = await fastify({
      logger: true,
    }).post('/messages', async (request, reply) => {
      messageStore = request.body as string;
      return reply.code(201).send();
    });
    const baseUrl = await server.listen(0);

    try {
      const messageClient = new MessageClientHttp(baseUrl);

      await messageClient.create('a new message');

      expect(messageStore).toEqual('a new message');
    } finally {
      await server.close();
    }
  });

  it(`Get a message`, async () => {
    const storedMessage: string = 'a new message';

    const server = await fastify({
      logger: true,
    }).get('/message', async (_, reply) => {
      return reply.send(storedMessage);
    });
    const baseUrl = await server.listen(0);

    try {
      const messageClient = new MessageClientHttp(baseUrl);

      const retrievedMessage = await messageClient.get();

      expect(retrievedMessage).toEqual(storedMessage);
    } finally {
      await server.close();
    }
  });
});
