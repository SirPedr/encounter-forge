import { prisma } from "@/lib/prisma";
import fuzzysort from "fuzzysort";
import { buildMonsterFilters } from "../buildMonsterFilters";
import { GetMonstersParams } from "../validateMonstersQuery";

export const getMonsters = async ({
  pagination,
  filters,
}: GetMonstersParams) => {
  const filteredMonsters = await prisma.monster.findMany({
    skip: pagination.offset,
    take: pagination.limit,
    where: buildMonsterFilters(filters),
  });

  if (!filters?.name) {
    return filteredMonsters;
  }

  const results = fuzzysort.go(filters.name, filteredMonsters, {
    key: "name",
  });

  return results.map((result) => result.obj);
};
