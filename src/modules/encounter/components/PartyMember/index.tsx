import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { type PartyMember as PartyMemberData } from "@/modules/party/types";
import { SelectContent } from "@radix-ui/react-select";
import { useDebounce } from "@uidotdev/usehooks";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const MAX_LEVEL = 20;

type Props = PartyMemberData & {
  onRemove: (id: string) => void;
  onUpdate: (pm: PartyMemberData) => void;
};

export const PartyMember = ({ id, name, level, onRemove, onUpdate }: Props) => {
  const [playerName, setPlayerName] = useState(name);
  const delayedPlayerName = useDebounce(playerName, 300);

  useEffect(() => {
    if (delayedPlayerName !== name) {
      onUpdate({ id, level, name: delayedPlayerName });
    }
  }, [delayedPlayerName]);

  return (
    <React.Fragment>
      <TableCell>
        <Input
          aria-label="Name"
          value={playerName}
          onChange={({ target }) => {
            setPlayerName(target.value);
          }}
        />
      </TableCell>

      <TableCell>
        <Select
          defaultValue={level.toString()}
          onValueChange={(value) =>
            onUpdate({ id, name, level: Number(value) })
          }
        >
          <SelectTrigger className="w-full" aria-label="Level">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: MAX_LEVEL }, (_, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        <Button onClick={() => onRemove(id)} aria-label={`Remove ${name}`}>
          <Trash2 />
        </Button>
      </TableCell>
    </React.Fragment>
  );
};
