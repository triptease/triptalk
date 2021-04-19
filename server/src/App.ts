import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server } from 'https';
import { Client } from 'pg';
import Postgrator from 'postgrator';

export class App {
  private readonly fastify: FastifyInstance<Server>;
  private readonly port: number;
  private readonly client: Client;
  private readonly postgrator: Postgrator;

  constructor(port: number) {
    this.port = port;
    this.fastify = fastify({
      logger: true,
    });

    this.fastify.register(fastifyCors);

    this.postgrator = new Postgrator({
      migrationDirectory: `${__dirname}/../dbMigrations`,
      driver: 'pg',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5003,
      host: 'localhost',
    });

    let message: string = '';
    this.client = new Client({
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5003,
      host: 'localhost',
    });

    this.fastify.post('/messages', async (request, reply) => {
      message = request.body as string;
      await this.client.query(`INSERT INTO messages (message) VALUES ('${message}');`);
      return reply.code(201).send();
    });

    this.fastify.get('/message', async (_, reply) => {
      const result = await this.client.query(`SELECT * FROM messages;`);
      return reply.code(200).send(result.rows[0].message);
    });
  }

  async start() {
    const appliedMigrations = await this.postgrator.migrate();
    console.log(appliedMigrations);

    await this.client.connect();

    const url = await this.fastify.listen(this.port);
    console.log(`App listening on ${url}`);
  }

  async stop() {
    await this.client.end();
    return this.fastify.close();
  }
}
