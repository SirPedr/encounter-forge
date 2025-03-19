"use client";

import { getQueryClient } from "@/providers/reactQuery";
import { EncounterForgeStoreProvider } from "@/providers/zustand";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EncounterForgeStoreProvider>{children}</EncounterForgeStoreProvider>
    </QueryClientProvider>
  );
}
