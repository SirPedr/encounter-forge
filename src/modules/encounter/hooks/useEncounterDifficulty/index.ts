import { useEncounterForgeStore } from "@/providers/zustand";
import { ENCOUNTER_DIFFICULTY } from "../../types";
import { balanceEncounter } from "../../lib/balanceEncounter";

export const useEncounterDifficulty = () => {
  const monsters = useEncounterForgeStore((store) => store.monsters);
  const party = useEncounterForgeStore((store) => store.party);

  if (!monsters.length || !party.length) {
    return null;
  }

  return balanceEncounter({ monsters, party });
};
