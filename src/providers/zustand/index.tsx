import { EncounterSlice } from "@/modules/encounter/slice";
import { createEncounterForgeStore } from "@/zustand/store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type EncounterForgeStorApi = ReturnType<typeof createEncounterForgeStore>;

const EncounterForgeStoreContext = createContext<
  EncounterForgeStorApi | undefined
>(undefined);

export const EncounterForgeStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<EncounterForgeStorApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createEncounterForgeStore();
  }

  return (
    <EncounterForgeStoreContext.Provider value={storeRef.current}>
      {children}
    </EncounterForgeStoreContext.Provider>
  );
};

export const useEncounterForgeStore = <T,>(
  selector: (store: EncounterSlice) => T
) => {
  const store = useContext(EncounterForgeStoreContext);

  if (!store) {
    throw new Error("useEncounterForgeStore must be used within a Provider");
  }

  return useStore(store, selector);
};
