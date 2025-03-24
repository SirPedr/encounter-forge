import { StateCreator } from "zustand";
import { Party, PartyMember } from "../types";

export type PartySlice = {
  party: Party;
  addPartyMember: (newMember: PartyMember) => void;
  removePartyMember: (id: PartyMember["id"]) => void;
  updatePartyMember: (updatedMember: PartyMember) => void;
};

export const createPartySlice: StateCreator<PartySlice, [], [], PartySlice> = (
  set
) => ({
  party: [],
  addPartyMember: (newMember) =>
    set((state) => ({ party: [...state.party, newMember] })),
  removePartyMember: (id) =>
    set((state) => ({
      party: state.party.filter((member) => member.id !== id),
    })),
  updatePartyMember: (updatedMember) =>
    set((state) => ({
      party: state.party.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      ),
    })),
});
