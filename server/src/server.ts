import Fastify from 'fastify';
import cors from '@fastify/cors';

import { guessRoutes } from './routes/guess';
import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(guessRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)

  fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
