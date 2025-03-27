"use client";

import { Button } from "@/components/ui/button";
import { MonstersList } from "@/modules/encounter/components/MonstersList/MonstersList";
import { useEncounterForgeStore } from "@/providers/zustand";
import { useState } from "react";
import { EncounterDetails } from "../../components/EncounterDetails";
import { EncounterMonster } from "../../types";
import { useEncounterDifficulty } from "../../hooks/useEncounterDifficulty";
import { Badge } from "@/components/ui/badge";

export const MonsterListingPage = () => {
  const monsters = useEncounterForgeStore((store) => store.monsters);
  const updateMonsterInEncounter = useEncounterForgeStore(
    (store) => store.updateMonsterInEncounter
  );
  const difficulty = useEncounterDifficulty();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onMonsterUpdate = (monster: EncounterMonster) => {
    updateMonsterInEncounter(monster);
  };

  return (
    <main>
      <h1>Monsters</h1>
      <section className="bg-(--background) mb-4 sticky top-0 p-4 -m-4">
        <Button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Encounter details{" "}
          {difficulty ? (
            <Badge variant="secondary">{difficulty.toUpperCase()}</Badge>
          ) : (
            ""
          )}
        </Button>
      </section>
      <EncounterDetails
        open={isDrawerOpen}
        onOpenChange={(open) => setIsDrawerOpen(open)}
        encounter={{ monsters }}
        onMonsterAmountUpdate={onMonsterUpdate}
      />

      <MonstersList onMonsterAdd={onMonsterUpdate} />
    </main>
  );
};
