"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Monster } from "@prisma/client";
import React from "react";
import { EncounterMonster } from "../../types";

type Props = {
  monster: Monster;
  amount: number;
  onAmountChange?: (monster: EncounterMonster) => void;
};

export const MonsterCard = ({ monster, amount, onAmountChange }: Props) => {
  const onIncreaseAmount = () => {
    onAmountChange?.({ ...monster, amount: amount + 1 });
  };

  const onDecreaseAmount = () => {
    onAmountChange?.({ ...monster, amount: amount - 1 });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row">
        <CardTitle>{monster.name}</CardTitle>
        <CardDescription>CR {monster.challenge_rating}</CardDescription>
      </CardHeader>

      <CardContent>
        <CardDescription>Type: {monster.type.join(", ")}</CardDescription>
        <CardDescription>
          Environments: {monster.environments.join(", ")}
        </CardDescription>
        <CardDescription>
          XP: {monster.xpGeneral}{" "}
          {monster.xpInLair && (
            <React.Fragment>| In Lair: {monster.xpInLair}</React.Fragment>
          )}
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-center">
        {amount === 0 ? (
          <Button onClick={onIncreaseAmount} className="w-full">
            Add
          </Button>
        ) : (
          <div className="flex items-center gap-5">
            <Button
              onClick={onDecreaseAmount}
              aria-label={`Remove 1 ${monster.name} from encounter`}
            >
              -
            </Button>
            {amount}
            <Button
              onClick={onIncreaseAmount}
              aria-label={`Add 1 ${monster.name} from encounter`}
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
