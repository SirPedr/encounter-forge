import { Button } from "@/components/ui/button";
import { type PartyMember as PartyMemberData } from "@/modules/party/types";
import React from "react";

const MAX_LEVEL = 20;

type Props = PartyMemberData & {
  onRemove: (id: string) => void;
  onUpdate: (pm: PartyMemberData) => void;
};

export const PartyMember = ({ id, name, level, onRemove, onUpdate }: Props) => (
  <React.Fragment>
    <label>
      Name
      <input
        value={name}
        onChange={({ target }) => {
          onUpdate({ id, level, name: target.value });
        }}
      />
    </label>

    <label>
      Level
      <select
        value={level}
        onChange={({ target }) =>
          onUpdate({ id, name, level: Number(target.value) })
        }
      >
        {Array.from({ length: MAX_LEVEL }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </label>

    <Button onClick={() => onRemove(id)}>Remove {name}</Button>
  </React.Fragment>
);
