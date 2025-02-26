import { faker } from "@faker-js/faker";
import { Monster } from "@prisma/client";

type CreateMonsterFixtureParams = Partial<Monster & { amount: number }>;

export const createMonsterFixture = (
  params: CreateMonsterFixtureParams
): Monster & { amount: number } => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  challenge_rating: 1,
  xpGeneral: faker.number.int(),
  xpInLair: null,
  environments: ["mountain", "planar, air"],
  source: "XMM",
  type: ["elemental"],
  amount: 1,
  ...params,
});
