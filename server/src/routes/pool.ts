import { FastifyInstance } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import z from 'zod';

import { prisma } from '../lib/prisma';

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const uniqueIdGenerator = new ShortUniqueId({ length: 6 });
    const poolCode = String(uniqueIdGenerator()).toUpperCase();

    const { title } = createPoolBody.parse(request.body);

    await prisma.pool.create({
      data: {
        title,
        code: poolCode,
      },
    });

    return reply.status(201).send({ code: poolCode });
  });
}
