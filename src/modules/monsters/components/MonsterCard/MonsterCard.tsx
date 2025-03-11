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
import { useState } from "react";

type Props = {
  monster: Monster;
  onAmountChange?: (monsterID: number, amount: number) => void;
};

export const MonsterCard = ({ monster, onAmountChange }: Props) => {
  const [amount, setAmount] = useState(0);

  const onIncreaseAmount = () => {
    setAmount((amount) => amount + 1);
    onAmountChange?.(monster.id, amount + 1);
  };

  const onDecreaseAmount = () => {
    setAmount((amount) => amount - 1);
    onAmountChange?.(monster.id, amount - 1);
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
          XP: {monster.xpGeneral} | In Lair: {monster.xpInLair}
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
