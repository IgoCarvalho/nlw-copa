import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/pools/:id/games',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getGamesParams = z.object({
        id: z.string(),
      });

      const { id: poolId } = getGamesParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: 'desc',
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId,
              },
            },
          },
        },
      });

      const parsedGames = games.map((game) => ({
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      }));

      return { games: parsedGames };
    }
  );
}
