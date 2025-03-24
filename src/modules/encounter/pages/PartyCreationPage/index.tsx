import { Button } from "@/components/ui/button";
import { useParty } from "@/modules/party/hooks/useParty";
import { PartyMember } from "../../components/PartyMember";

export const PartyCreationPage = () => {
  const { party, addPartyMember, removePartyMember, updatePartyMember } =
    useParty();

  if (party.length === 0) {
    return (
      <>
        <p>No party defined</p>
        <p>Start creating your encounter by adding one party member</p>
        <Button onClick={addPartyMember}>Add party member</Button>
      </>
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
