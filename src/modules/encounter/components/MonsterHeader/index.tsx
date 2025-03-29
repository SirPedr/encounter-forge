import { CardDescription, CardTitle } from "@/components/ui/card";
import { capitalize } from "@/lib/capitalize";
import { formatCR } from "@/lib/formatCR";
import { Monster } from "@prisma/client";
import { Fragment } from "react";

type Props = {
  monster: Monster;
};

export const MonsterHeader = ({ monster }: Props) => {
  return (
    <Fragment>
      <div>
        <CardTitle className="font-bentham text-2xl">{monster.name}</CardTitle>
        <CardDescription>{capitalize(monster.type.join(", "))}</CardDescription>
      </div>
      <CardDescription className="text-xl font-bentham text-white">
        CR {formatCR(monster.challenge_rating)}
      </CardDescription>
    </Fragment>
  );
};
