"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonsterListingPage } from "../MonsterListingPage";
import { PartyCreationPage } from "../PartyCreationPage";

export const EncounterBuildPage = () => (
  <Tabs defaultValue="monsters">
    <TabsList className="w-full">
      <TabsTrigger value="party">Party</TabsTrigger>
      <TabsTrigger value="monsters">Monsters</TabsTrigger>
    </TabsList>

    <TabsContent value="monsters">
      <MonsterListingPage />
    </TabsContent>

    <TabsContent value="party">
      <PartyCreationPage />
    </TabsContent>
  </Tabs>
);
