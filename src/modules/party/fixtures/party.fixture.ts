import { faker } from "@faker-js/faker";
import { Party } from "../types";
import { nanoid } from "nanoid";
type CreatePartyFixtureParams = {
  level: number;
  amountOfPlayers: number;
};

export const createPartyFixture = ({
  level,
  amountOfPlayers,
}: CreatePartyFixtureParams): Party =>
  Array.from({ length: amountOfPlayers }, () => ({
    id: nanoid(),
    name: faker.person.firstName(),
    level,
  }));
