import {
  createEncounterSlice,
  EncounterSlice,
} from "@/modules/encounter/slice";
import { createPartySlice, PartySlice } from "@/modules/party/slice";
import { createStore } from "zustand/vanilla";

export type EncounterForgeStore = EncounterSlice & PartySlice;

export const createEncounterForgeStore = (
  initialValue?: Partial<EncounterForgeStore>
) =>
  createStore<EncounterForgeStore>()((...storeProps) => ({
    ...createEncounterSlice(...storeProps),
    ...createPartySlice(...storeProps),
    ...initialValue,
  }));
