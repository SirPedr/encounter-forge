import { useEncounterForgeStore } from "@/providers/zustand";
import { nanoid } from "nanoid";

export const useParty = () => {
  const party = useEncounterForgeStore((store) => store.party);
  const addPartyMember = useEncounterForgeStore(
    (store) => store.addPartyMember
  );
  const removePartyMember = useEncounterForgeStore(
    (store) => store.removePartyMember
  );
  const updatePartyMember = useEncounterForgeStore(
    (store) => store.updatePartyMember
  );

  return {
    party,
    addPartyMember: () => {
      addPartyMember({
        id: nanoid(),
        level: 1,
        name: `Player ${party.length + 1}`,
      });
    },
    removePartyMember,
    updatePartyMember,
  };
};
