import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";
import { makeQueryClient } from "@/providers/reactQuery";
import { EncounterForgeStoreProvider } from "@/providers/zustand";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EncounterBuildPage } from ".";
import { Monster } from "@prisma/client";

vi.mock("next/navigation", () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("next-router-mock"),
  useSearchParams: vi.fn(() => new URLSearchParams({ page: "1" })),
}));

const renderEncounterBuildPage = ({
  preloadedMonsters,
}: {
  preloadedMonsters: Monster[];
}) =>
  render(
    <QueryClientProvider
      client={makeQueryClient([
        [["monsters", { offset: 0 }], preloadedMonsters],
      ])}
    >
      <EncounterForgeStoreProvider>
        <EncounterBuildPage />
      </EncounterForgeStoreProvider>
    </QueryClientProvider>
  );

describe("EncounterBuildPage", () => {
  it("should render with all basic elements", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });

    renderEncounterBuildPage({ preloadedMonsters: [fakeMonster] });

    const monsterList = screen.getByRole("list", { name: /monster list/i });
    const renderedItems = within(monsterList).getAllByRole("listitem");

    expect(monsterList).toBeInTheDocument();
    expect(renderedItems).toHaveLength(1);

    expect(screen.getByText(fakeMonster.name)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /encounter details/i })
    ).toBeInTheDocument();
  });

  it("should update the encounter summary drawer when monsters are added", async () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });

    renderEncounterBuildPage({ preloadedMonsters: [fakeMonster] });

    const addMonsterButton = screen.getByRole("button", {
      name: /add/i,
    });
    const encounterDetailsButton = screen.getByRole("button", {
      name: /encounter details/i,
    });

    expect(addMonsterButton).toBeInTheDocument();
    expect(encounterDetailsButton).toBeInTheDocument();

    await userEvent.click(addMonsterButton);
    await userEvent.click(encounterDetailsButton);

    const encounterDetailsDrawer = screen.getByRole("dialog", {
      name: /encounter details/i,
    });

    expect(encounterDetailsDrawer).toBeInTheDocument();

    expect(
      within(encounterDetailsDrawer).getByText(fakeMonster.name)
    ).toBeInTheDocument();
  });

  it("should update the encounter summary drawer when monsters are added", async () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });

    renderEncounterBuildPage({ preloadedMonsters: [fakeMonster] });

    const addMonsterButton = screen.getByRole("button", {
      name: /add/i,
    });
    const encounterDetailsButton = screen.getByRole("button", {
      name: /encounter details/i,
    });

    expect(addMonsterButton).toBeInTheDocument();
    expect(encounterDetailsButton).toBeInTheDocument();

    await userEvent.click(addMonsterButton);

    const removeMonsterButton = screen.getByRole("button", { name: /remove/i });

    await userEvent.click(removeMonsterButton);
    await userEvent.click(encounterDetailsButton);

    const encounterDetailsDrawer = screen.getByRole("dialog", {
      name: /encounter details/i,
    });

    expect(encounterDetailsDrawer).toBeInTheDocument();

    expect(
      within(encounterDetailsDrawer).queryByText(fakeMonster.name)
    ).not.toBeInTheDocument();
  });

  it("should update monster list when amount is changed inside the encounter details drawer", async () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const user = userEvent.setup();

    renderEncounterBuildPage({ preloadedMonsters: [fakeMonster] });

    const addMonsterButton = screen.getByRole("button", {
      name: /add/i,
    });
    const encounterDetailsButton = screen.getByRole("button", {
      name: /encounter details/i,
    });

    expect(addMonsterButton).toBeInTheDocument();
    expect(encounterDetailsButton).toBeInTheDocument();

    await user.click(addMonsterButton);
    await user.click(encounterDetailsButton);

    const encounterDetailsDrawer = screen.getByRole("dialog", {
      name: /encounter details/i,
    });

    const plusButton = within(encounterDetailsDrawer).getByRole("button", {
      name: /add/i,
    });

    await user.click(plusButton);
    await user.keyboard("{Escape}");

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
