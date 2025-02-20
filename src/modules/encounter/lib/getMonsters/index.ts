import { prisma } from "@/lib/prisma";
import { buildMonsterFilters, GetMonsterFilters } from "../buildMonsterFilters";

type GetMonstersParams = {
  pagination: {
    offset: number;
    limit: number;
  };
  filters?: GetMonsterFilters;
};

export const getMonsters = async ({
  pagination,
  filters,
}: GetMonstersParams) => {
  if (!filters) {
    return await prisma.monster.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  return await prisma.monster.findMany({
    skip: pagination.offset,
    take: pagination.limit,
    where: buildMonsterFilters(filters),
  });
};
