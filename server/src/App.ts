import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server } from 'https';

export class App {
  private readonly server: FastifyInstance<Server>;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.server = fastify({
      logger: true,
    });

    this.server.register(fastifyCors);

    this.server.get('/message', async () => 'Hello World!');
  }

  async start() {
    const url = await this.server.listen(this.port);
    console.log(`App listening on ${url}`);
  }

  async stop() {
    return this.server.close();
  }
}
