import { createPartyFixture } from "@/modules/party/fixtures/party.fixture";
import { EncounterForgeStoreProvider } from "@/providers/zustand";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PartyCreationPage } from ".";
import userEvent from "@testing-library/user-event";

describe("PartyCreationPage", () => {
  it("should render on empty state", () => {
    render(
      <EncounterForgeStoreProvider>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    expect(screen.getByText("Who Dares to Face Them?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "No adventurers have stepped forward yet. Add a party to see how they measure up against the challenge!"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add party member/i })
    ).toBeInTheDocument();
  });

  it("should render input fields for each party member", () => {
    const fakeParty = createPartyFixture({ amountOfPlayers: 3, level: 1 });

    render(
      <EncounterForgeStoreProvider initialStore={{ party: fakeParty }}>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    const levelSelects = screen.getAllByRole("combobox", { name: /level/i });

    expect(levelSelects).toHaveLength(fakeParty.length);

    levelSelects.forEach((select, index) => {
      expect(
        within(select).getByText(fakeParty[index].level)
      ).toBeInTheDocument();
    });

    const nameInputs = screen.getAllByRole("textbox", { name: /name/i });

    expect(nameInputs).toHaveLength(fakeParty.length);

    nameInputs.forEach((input, index) => {
      expect(input).toHaveValue(fakeParty[index].name);
    });

    fakeParty.forEach((partyMember) => {
      expect(
        screen.getByRole("button", { name: `Remove ${partyMember.name}` })
      ).toBeInTheDocument();
    });
  });

  it("should keep add button even when party members are present", () => {
    const fakeParty = createPartyFixture({ amountOfPlayers: 3, level: 1 });

    render(
      <EncounterForgeStoreProvider initialStore={{ party: fakeParty }}>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    expect(screen.getByRole("button", { name: /add party member/i }))
      .toBeInTheDocument;
  });

  it("should allow to add party members", async () => {
    render(
      <EncounterForgeStoreProvider>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    const addPartyMemberButton = screen.getByRole("button", {
      name: /add party member/i,
    });

    await userEvent.click(addPartyMemberButton);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", { name: /level/i })
    ).toBeInTheDocument();
  });

  it("should allow to remove party members", async () => {
    const fakeParty = createPartyFixture({ amountOfPlayers: 1, level: 1 });

    render(
      <EncounterForgeStoreProvider initialStore={{ party: fakeParty }}>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    const removeButtons = screen.getByRole("button", {
      name: /remove/i,
    });

    await userEvent.click(removeButtons);

    expect(
      screen.queryByRole("textbox", { name: /name/i })
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(/no adventurers have stepped forward yet/i)
    ).toBeInTheDocument();
  });

  it("should allow to edit party members", async () => {
    const user = userEvent.setup();
    const fakeParty = createPartyFixture({ amountOfPlayers: 1, level: 1 });

    render(
      <EncounterForgeStoreProvider initialStore={{ party: fakeParty }}>
        <PartyCreationPage />
      </EncounterForgeStoreProvider>
    );

    const nameInput = screen.getByRole("textbox", { name: /name/i });

    await user.clear(nameInput);
    await user.type(nameInput, "Jonathan Joestar");

    expect(nameInput).toHaveValue("Jonathan Joestar");

    const levelSelect = screen.getByRole("combobox", { name: /level/i });

    await user.click(levelSelect);

    const levelOptions = screen.getByRole("option", { name: "5" });

    await user.click(levelOptions);

    expect(within(levelSelect).getByText("5")).toBeInTheDocument();
  });
});
