import { describe, expect, it } from "vitest";
import { balanceEncounter } from ".";
import { ENCOUNTER_DIFFICULTY } from "../../types";
import { createPartyFixture } from "@/modules/party/fixtures/party.fixture";
import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";

describe("balanceEncounter", () => {
  describe("Sly Flourish method", () => {
    describe("For levels 1-4", () => {
      it.each([
        [ENCOUNTER_DIFFICULTY.EASY, 1],
        [ENCOUNTER_DIFFICULTY.MEDIUM, 2],
        [ENCOUNTER_DIFFICULTY.HARD, 3],
        [ENCOUNTER_DIFFICULTY.DEADLY, 4],
      ])(
        "should evaluate encounter as %s",
        (expectedDifficulty, challenge_rating) => {
          const result = balanceEncounter({
            party: createPartyFixture({ level: 3, amountOfPlayers: 4 }),
            monsters: [createMonsterFixture({ challenge_rating })],
          });

          expect(result).toEqual(expectedDifficulty);
        }
      );
    });

    describe("For levels 5-10", () => {
      it.each([
        [ENCOUNTER_DIFFICULTY.EASY, 5],
        [ENCOUNTER_DIFFICULTY.MEDIUM, 7],
        [ENCOUNTER_DIFFICULTY.HARD, 9],
        [ENCOUNTER_DIFFICULTY.DEADLY, 11],
      ])(
        "should evaluate encounter as %s",
        (expectedDifficulty, challenge_rating) => {
          const result = balanceEncounter({
            party: createPartyFixture({ level: 5, amountOfPlayers: 4 }),
            monsters: [createMonsterFixture({ challenge_rating })],
          });

          expect(result).toEqual(expectedDifficulty);
        }
      );

      describe("For levels 11-16", () => {
        it.each([
          [ENCOUNTER_DIFFICULTY.EASY, 20],
          [ENCOUNTER_DIFFICULTY.MEDIUM, 29],
          [ENCOUNTER_DIFFICULTY.HARD, 39],
          [ENCOUNTER_DIFFICULTY.DEADLY, 49],
        ])(
          "should evaluate encounter as %s",
          (expectedDifficulty, challenge_rating) => {
            const result = balanceEncounter({
              party: createPartyFixture({ level: 16, amountOfPlayers: 4 }),
              monsters: [createMonsterFixture({ challenge_rating })],
            });

            expect(result).toEqual(expectedDifficulty);
          }
        );
      });

      describe("For levels 17-20", () => {
        it.each([
          [ENCOUNTER_DIFFICULTY.EASY, 21],
          [ENCOUNTER_DIFFICULTY.MEDIUM, 31],
          [ENCOUNTER_DIFFICULTY.HARD, 41],
          [ENCOUNTER_DIFFICULTY.DEADLY, 52],
        ])(
          "should evaluate encounter as %s",
          (expectedDifficulty, challenge_rating) => {
            const result = balanceEncounter({
              party: createPartyFixture({ level: 17, amountOfPlayers: 3 }),
              monsters: [createMonsterFixture({ challenge_rating })],
            });

            expect(result).toEqual(expectedDifficulty);
          }
        );
      });
    });
  });
});
