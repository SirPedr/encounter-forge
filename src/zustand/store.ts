import {
  createEncounterSlice,
  EncounterSlice,
} from "@/modules/encounter/slice";
import { createStore } from "zustand/vanilla";

export const createEncounterForgeStore = () =>
  createStore<EncounterSlice>()((...storeProps) => ({
    ...createEncounterSlice(...storeProps),
  }));
