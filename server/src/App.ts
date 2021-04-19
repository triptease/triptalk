import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server } from 'https';

export class App {
  private readonly fastify: FastifyInstance<Server>;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.fastify = fastify({
      logger: true,
    });

    this.fastify.register(fastifyCors);

    let message: string = '';

    this.fastify.post('/messages', async (request, reply) => {
      message = request.body as string;
      return reply.code(204).send();
    });

    this.fastify.get('/message', async () => message);
  }

  async start() {
    const url = await this.fastify.listen(this.port);
    console.log(`App listening on ${url}`);
  }

  async stop() {
    return this.fastify.close();
  }
}
