import { FastifyInstance } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import z from 'zod';

import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

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

    try {
      await request.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code: poolCode,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      });
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code: poolCode,
        },
      });
    }

    return reply.status(201).send({ code: poolCode });
  });

  fastify.post(
    '/pools/join',
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const joinPoolBody = z.object({
        code: z.string(),
      });

      const { code: poolCode } = joinPoolBody.parse(request.body);

      const pool = await prisma.pool.findUnique({
        where: { code: poolCode },
        include: {
          participants: {
            where: { userId: request.user.sub },
          },
        },
      });

      if (!pool) {
        return reply.status(400).send({
          message: 'Pool not found.',
        });
      }

      if (pool.participants.length > 0) {
        return reply.status(400).send({
          message: 'You already join this pool.',
        });
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: { id: pool.id },
          data: { ownerId: request.user.sub },
        });
      }

      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub,
        },
      });

      return reply.status(201).send();
    }
  );

  fastify.get(
    '/pools',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const pools = await prisma.pool.findMany({
        where: {
          participants: {
            some: { userId: request.user.sub },
          },
        },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },
          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return { pools };
    }
  );

  fastify.get(
    '/pools/:id',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id: poolId } = getPoolParams.parse(request.params);

      const pool = await prisma.pool.findUnique({
        where: { id: poolId },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },
          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return { pool };
    }
  );
}
