import { prisma } from "@/lib/prisma";
import fuzzysort from "fuzzysort";
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
  const filteredMonsters = await prisma.monster.findMany({
    skip: pagination.offset,
    take: pagination.limit,
    ...buildMonsterFilters(filters ?? {}),
  });

  if (!filters?.name) {
    return filteredMonsters;
  }

  const results = fuzzysort.go(filters.name, filteredMonsters, {
    key: "name",
  });

  return results.map((result) => result.obj);
};
