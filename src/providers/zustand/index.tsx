import {
  createEncounterForgeStore,
  EncounterForgeStore,
} from "@/zustand/store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type EncounterForgeStorApi = ReturnType<typeof createEncounterForgeStore>;

const EncounterForgeStoreContext = createContext<
  EncounterForgeStorApi | undefined
>(undefined);

export const EncounterForgeStoreProvider = ({
  children,
  initialStore,
}: {
  children: React.ReactNode;
  initialStore?: Partial<EncounterForgeStore>;
}) => {
  const storeRef = useRef<EncounterForgeStorApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createEncounterForgeStore(initialStore);
  }

  return (
    <EncounterForgeStoreContext value={storeRef.current}>
      {children}
    </EncounterForgeStoreContext>
  );
};

export const useEncounterForgeStore = <T,>(
  selector: (store: EncounterForgeStore) => T
) => {
  const store = useContext(EncounterForgeStoreContext);

  if (!store) {
    throw new Error("useEncounterForgeStore must be used within a Provider");
  }

  return useStore(store, selector);
};
