import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Blue Pen',
      email: 'blue@email.com',
      avatarUrl: 'https://github.com/igocarvalho.png',
      googleId: 'c9m1208mcc3m50.v4.cx0820j59c8j',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Bleu Pool',
      code: 'PEN123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-12-20T14:30:00.167Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-12-21T14:30:00.167Z',
      firstTeamCountryCode: 'BE',
      secondTeamCountryCode: 'CO',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPOints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
