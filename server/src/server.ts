import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import 'dotenv/config';

import { env } from './config/env';

import { authRoutes } from './routes/auth';
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

  await fastify.register(jwt, {
    secret: env.JWT_SECRET_KEY,
  });

  await fastify.register(authRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  fastify.listen({ port: env.PORT || 3333, host: '0.0.0.0' });
}

bootstrap();
