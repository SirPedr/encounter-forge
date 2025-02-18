import { prisma } from "@/lib/prisma";

type GetMonstersParams = {
  pagination: {
    offset: number;
    limit: number;
  };
};

export const getMonsters = async ({ pagination }: GetMonstersParams) =>
  await prisma.monster.findMany({
    skip: pagination.offset,
    take: pagination.limit,
  });
