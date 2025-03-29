import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/lib/capitalize";
import { Monster } from "@prisma/client";
import { Fragment } from "react";

type Props = {
  monster: Monster;
};

export const MonsterStats = ({ monster }: Props) => (
  <Fragment>
    <div>
      <dt className="font-bold">XP</dt>
      <dd>{monster.xpGeneral}</dd>
    </div>

    {monster.xpInLair && (
      <div>
        <dt className="font-bold">XP In Lair</dt>
        <dd>{monster.xpInLair}</dd>
      </div>
    )}

    <div className="mb-2">
      <p className="mb-2 font-bold">Environments</p>
      <ul className="flex flex-wrap gap-2">
        {monster.environments.map((env) => (
          <li key={env} className="text-sm" aria-label={env}>
            <Badge>{capitalize(env)}</Badge>
          </li>
        ))}
      </ul>
    </div>
  </Fragment>
);
