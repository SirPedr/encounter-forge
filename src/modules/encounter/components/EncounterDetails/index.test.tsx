import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EncounterDetails } from ".";

describe("EncounterDetails", () => {
  it("should render monsters in encounter with all their information", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const monstersInEncounter = [fakeMonster];

    render(
      <EncounterDetails open encounter={{ monsters: monstersInEncounter }} />
    );

    expect(
      screen.getByRole("heading", { name: /encounter details/i })
    ).toBeInTheDocument();

    const monsterList = screen.getByRole("list", {
      name: /monsters in encounter/i,
    });
    const listContainer = within(monsterList);

    const monsterListItem = listContainer.getByRole("listitem", {
      name: fakeMonster.name,
    });
    const itemContainer = within(monsterListItem);

    expect(monsterList).toBeInTheDocument();
    expect(monsterListItem).toBeInTheDocument();

    expect(
      itemContainer.getByText(`CR ${fakeMonster.challenge_rating}`)
    ).toBeInTheDocument();

    expect(itemContainer.getByText(fakeMonster.amount)).toBeInTheDocument();

    expect(
      itemContainer.getByRole("button", {
        name: `Add 1 ${fakeMonster.name} to encounter`,
      })
    ).toBeInTheDocument();

    expect(
      itemContainer.getByRole("button", {
        name: `Remove 1 ${fakeMonster.name} from encounter`,
      })
    ).toBeInTheDocument();
  });
});
