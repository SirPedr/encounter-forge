import { Party } from "@/modules/party/types";
import { Monster } from "@prisma/client";
import { ENCOUNTER_DIFFICULTY, EncounterMonster } from "../../types";
import { getDeadlyThreshold } from "../getDeadlyThreshold";

type BalanceParams = {
  party: Party;
  monsters: Array<EncounterMonster>;
};

const MAX_POSSIBLE_PARTY_LEVEL = 20;

const getDifficultyThresholds = (deadlyThreshold: number) => [
  { difficulty: ENCOUNTER_DIFFICULTY.DEADLY, threshold: deadlyThreshold },
  { difficulty: ENCOUNTER_DIFFICULTY.HARD, threshold: deadlyThreshold * 0.8 },
  { difficulty: ENCOUNTER_DIFFICULTY.MEDIUM, threshold: deadlyThreshold * 0.6 },
];

export const balanceEncounter = ({ monsters, party }: BalanceParams) => {
  const totalChallengeRating = monsters.reduce(
    (currentSum, { challenge_rating, amount }) =>
      currentSum + challenge_rating * amount,
    0
  );

  const totalPartyLevel = party.reduce(
    (currentSum, { level }) => currentSum + level,
    0
  );

  const minimumPartyLevel = party.reduce(
    (currentMin, { level }) => Math.min(currentMin, level),
    MAX_POSSIBLE_PARTY_LEVEL
  );

  const deadlyThreshold = getDeadlyThreshold(
    minimumPartyLevel,
    totalPartyLevel
  );

  const difficultyThresholds = getDifficultyThresholds(deadlyThreshold);

  for (const { threshold, difficulty } of difficultyThresholds) {
    if (totalChallengeRating >= threshold) {
      return difficulty;
    }
  }

  return ENCOUNTER_DIFFICULTY.EASY;
};
