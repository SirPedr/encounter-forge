import { StateCreator } from "zustand";
import { ENCOUNTER_DIFFICULTY, EncounterMonster } from "../types";
import { updateMonsterList } from "../lib/updateMonsterList";

export type EncounterSlice = {
  monsters: Array<EncounterMonster>;
  difficulty: ENCOUNTER_DIFFICULTY | null;
  updateMonsterInEncounter: (monster: EncounterMonster) => void;
};

export const createEncounterSlice: StateCreator<
  EncounterSlice,
  [],
  [],
  EncounterSlice
> = (set) => ({
  monsters: [],
  difficulty: null,
  updateMonsterInEncounter: (monster) => {
    set((state) => ({
      monsters: updateMonsterList(monster, state.monsters),
    }));
  },
});
