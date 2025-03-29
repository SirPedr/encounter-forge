"use client";

import { Monster } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { MonsterCard } from "../MonsterCard/MonsterCard";
import { EncounterMonster } from "../../types";
import { useEncounterForgeStore } from "@/providers/zustand";

type Props = {
  onMonsterAdd: (monster: EncounterMonster) => void;
};

export const MonstersList = ({ onMonsterAdd }: Props) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const offset = (page - 1) * 10;
  const monstersInEncounter = useEncounterForgeStore((store) => store.monsters);

  const { data: monsters } = useQuery<Monster[]>({
    queryKey: ["monsters", { offset }],
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetch(`/api/monsters?offset=${offset}&limit=12`)
        .then((res) => res.json())
        .then((a) => a.monsters),
  });

  return (
    <section>
      <ol
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        aria-label="monster list"
      >
        {monsters?.map((monster) => {
          const amount =
            monstersInEncounter.find((m) => m.id === monster.id)?.amount ?? 0;
          return (
            <li key={monster.id} data-testid="monster-item">
              <MonsterCard
                monster={monster}
                amount={amount}
                onAmountChange={onMonsterAdd}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
};
