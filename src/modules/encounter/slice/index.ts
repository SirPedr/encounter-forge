import { StateCreator } from "zustand";
import { ENCOUNTER_DIFFICULTY, EncounterMonster } from "../types";

export type EncounterSlice = {
  monsters: Array<EncounterMonster>;
  difficulty: ENCOUNTER_DIFFICULTY | null;
  addMonster: (monster: EncounterMonster) => void;
};

export const createEncounterSlice: StateCreator<
  EncounterSlice,
  [],
  [],
  EncounterSlice
> = (set) => ({
  monsters: [],
  difficulty: null,
  addMonster: (monster) => {
    set((state) => ({
      monsters: [...state.monsters, monster],
    }));
  },
});
