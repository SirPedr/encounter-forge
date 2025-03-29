"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Monster } from "@prisma/client";
import React from "react";
import { EncounterMonster } from "../../types";
import { MonsterAmountControls } from "../MonsterAmountControls";
import { MonsterHeader } from "../MonsterHeader";
import { MonsterStats } from "../MonsterStats";

type Props = {
  monster: Monster;
  amount: number;
  onAmountChange: (monster: EncounterMonster) => void;
};

export const MonsterCard = ({ monster, amount, onAmountChange }: Props) => (
  <Card className="h-full pt-0 relative">
    <img
      src="https://platform.polygon.com/wp-content/uploads/sites/2/2024/09/phb-2024-cover.jpeg?quality=90&strip=all&crop=0,24.5552761479,100,50.8894477042"
      className="h-24 w-full object-cover"
    />
    <CardHeader className="flex flex-row items-center justify-between">
      <section className="absolute top-[78px] left-1/2 -translate-x-1/2">
        <MonsterAmountControls
          monster={monster}
          amount={amount}
          onAmountChange={onAmountChange}
        />
      </section>
      <MonsterHeader monster={monster} />
    </CardHeader>

    <CardContent className="flex flex-wrap gap-2 items-center justify-between">
      <MonsterStats monster={monster} />
    </CardContent>
  </Card>
);
