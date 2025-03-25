import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { type PartyMember as PartyMemberData } from "@/modules/party/types";
import { SelectContent } from "@radix-ui/react-select";
import { Trash2 } from "lucide-react";
import React from "react";

const MAX_LEVEL = 20;

type Props = PartyMemberData & {
  onRemove: (id: string) => void;
  onUpdate: (pm: PartyMemberData) => void;
};

export const PartyMember = ({ id, name, level, onRemove, onUpdate }: Props) => (
  <React.Fragment>
    <TableCell>
      <Input
        aria-label="Name"
        value={name}
        onChange={({ target }) => {
          onUpdate({ id, level, name: target.value });
        }}
      />
    </TableCell>

    <TableCell>
      <Select
        defaultValue={level.toString()}
        onValueChange={(value) => onUpdate({ id, name, level: Number(value) })}
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
