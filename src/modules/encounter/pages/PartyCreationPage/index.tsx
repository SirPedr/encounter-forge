import { Button } from "@/components/ui/button";
import { useParty } from "@/modules/party/hooks/useParty";
import { PartyMember } from "../../components/PartyMember";
import { EmptyState } from "../../components/EmptyState";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {party.map((partyMember) => (
            <TableRow key={partyMember.id}>
              <PartyMember
                {...partyMember}
                onRemove={removePartyMember}
                onUpdate={updatePartyMember}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={addPartyMember}
        className="w-full md:w-auto block ml-auto mt-4"
      >
        Add party member
      </Button>
    </div>
  );
};
