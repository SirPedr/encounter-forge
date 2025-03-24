import { Button } from "@/components/ui/button";
import { useParty } from "@/modules/party/hooks/useParty";
import { PartyMember } from "../../components/PartyMember";
import { EmptyState } from "../../components/EmptyState";
import React from "react";

export const PartyCreationPage = () => {
  const { party, addPartyMember, removePartyMember, updatePartyMember } =
    useParty();

  if (party.length === 0) {
    return (
      <React.Fragment>
        <EmptyState
          title="Who Dares to Face Them?"
          description="No adventurers have stepped forward yet. Add a party to see how they measure up against the challenge!"
        />
        <Button
          onClick={addPartyMember}
          className="w-full md:w-1/2 md:max-w-[430px] block mx-auto mt-4"
        >
          Add party member
        </Button>
      </React.Fragment>
    );
  }

  return (
    <ul>
      {party.map((partyMember) => (
        <li key={partyMember.id}>
          <PartyMember
            {...partyMember}
            onRemove={removePartyMember}
            onUpdate={updatePartyMember}
          />
        </li>
      ))}
    </ul>
  );
};
