import fastify, { FastifyInstance } from 'fastify';
import { Server } from 'https';

export class App {
  private readonly server: FastifyInstance<Server>;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.server = fastify({
      logger: true,
    });
  }

  async start() {
    const url = await this.server.listen(this.port);
    console.log(`App listening on ${url}`);
  }

  async stop() {
    return this.server.close();
  }
}
