import { Drawer as DrawerPrimitive } from "vaul";
import { EncounterMonster } from "../../types";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type Props = {
  encounter: { monsters: EncounterMonster[] };
  onMonsterAmountUpdate: (monster: EncounterMonster) => void;
} & React.ComponentProps<typeof DrawerPrimitive.Root>;

export const EncounterDetails = ({
  encounter,
  onMonsterAmountUpdate,
  ...drawerProps
}: Props) => {
  return (
    <Drawer direction="right" {...drawerProps}>
      <DrawerContent className="p-4 max-w-(--container-lg)">
        <DrawerTitle className="text-2xl border-b mb-2 pb-2">
          Encounter Details
        </DrawerTitle>
        <ul aria-label="Monsters in encounter">
          {encounter.monsters.map((monster) => (
            <li
              key={monster.id}
              aria-labelledby={`item-${monster.id}`}
              className="not-last:mb-4"
            >
              <Card className="flex-row items-center justify-between">
                <CardHeader>
                  <h3 id={`item-${monster.id}`}>{monster.name}</h3>
                  <p className="text-(--muted-foreground)">
                    CR {monster.challenge_rating}
                  </p>
                </CardHeader>

                <CardContent className="flex align-center gap-3 ">
                  <Button
                    size="sm"
                    aria-label={`Remove 1 ${monster.name} from encounter`}
                    onClick={() =>
                      onMonsterAmountUpdate({
                        ...monster,
                        amount: monster.amount - 1,
                      })
                    }
                  >
                    <Minus />
                  </Button>

                  <p className="leading-8">{monster.amount}</p>

                  <Button
                    aria-label={`Add 1 ${monster.name} to encounter`}
                    size="sm"
                    onClick={() =>
                      onMonsterAmountUpdate({
                        ...monster,
                        amount: monster.amount + 1,
                      })
                    }
                  >
                    <Plus />
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};
