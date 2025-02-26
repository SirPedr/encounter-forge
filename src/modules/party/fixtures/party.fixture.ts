import { faker } from "@faker-js/faker";
import { Party } from "../types";

type CreatePartyFixtureParams = {
  level: number;
  amountOfPlayers: number;
};

export const createPartyFixture = ({
  level,
  amountOfPlayers,
}: CreatePartyFixtureParams): Party =>
  Array.from({ length: amountOfPlayers }, () => ({
    name: faker.person.firstName(),
    level,
  }));
