import { Monster } from "@prisma/client";

export enum ENCOUNTER_DIFFICULTY {
  DEADLY = "deadly",
  HARD = "hard",
  MEDIUM = "medium",
  EASY = "easy",
}

export type EncounterMonster = Pick<
  Monster,
  "id" | "name" | "challenge_rating"
> & { amount: number };
