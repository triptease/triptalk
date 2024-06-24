import { Message, Visibility } from '@triptalk/shared';
import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server } from 'https';
import { Client } from 'pg';
import Postgrator from 'postgrator';
import { v4 as uuid } from 'uuid';

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

    this.client = new Client({
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5003,
      host: 'localhost',
    });

    this.postgrator = new Postgrator({
      migrationPattern: `${__dirname}/../dbMigrations`,
      driver: 'pg',
      database: 'postgres',
      execQuery: (query) => this.client.query(query),
    });
    let message: string = '';
    this.fastify.post('/messages', async (request, reply) => {
      message = request.body as string;
      await this.client.query(
        `INSERT INTO messages (id, message, liked, visibility) VALUES ('${uuid()}', '${message}', FALSE, '${
          Visibility.PUBLIC
        }');`,
      );
      return reply.code(201).send();
    });

    this.fastify.get('/messages', async (_, reply) => {
      const result = await this.client.query(`SELECT * FROM messages;`);

      const messages: Message[] = result.rows.map((row) => ({
        id: row.id,
        message: row.message,
        liked: row.liked,
        visibility: row.visibility,
      }));

      return reply.code(200).send(messages);
    });

    this.fastify.patch('/messages/:id', async (request, reply) => {
      const id = (request.params as { id: string }).id;
      await this.client.query(`UPDATE messages SET liked = TRUE WHERE id = '${id}'`);
      return reply.code(204).send();
    });

  }

  async start() {
    const appliedMigrations = await this.postgrator.migrate();
    console.log('App applied migrations:', appliedMigrations);

    await this.client.connect();

    const url = await this.fastify.listen(this.port);
    console.log(`App listening on ${url}`);
  }

  async stop() {
    await this.client.end();
    return this.fastify.close();
  }
}
