import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Monster } from "@prisma/client";
import { EncounterMonster } from "../../types";

type Props = {
  monster: Monster;
  amount: number;
  onAmountChange: (monster: EncounterMonster) => void;
};

export const MonsterAmountControls = ({
  monster,
  amount,
  onAmountChange,
}: Props) => {
  const onIncreaseAmount = () => {
    onAmountChange({ ...monster, amount: amount + 1 });
  };

  const onDecreaseAmount = () => {
    onAmountChange({ ...monster, amount: amount - 1 });
  };

  if (amount === 0) {
    return (
      <Button
        onClick={onIncreaseAmount}
        className="w-full"
        aria-label={`Add 1 ${monster.name} to encounter`}
      >
        <Plus />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-5 bg-card">
      <Button
        onClick={onDecreaseAmount}
        aria-label={`Remove 1 ${monster.name} from encounter`}
      >
        <Minus />
      </Button>
      {amount}
      <Button
        onClick={onIncreaseAmount}
        aria-label={`Add 1 ${monster.name} from encounter`}
      >
        <Plus />
      </Button>
    </div>
  );
};
