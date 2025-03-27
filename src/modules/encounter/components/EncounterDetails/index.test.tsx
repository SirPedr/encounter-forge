import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EncounterDetails } from ".";
import { ENCOUNTER_DIFFICULTY } from "../../types";

describe("EncounterDetails", () => {
  it("should render empty state when there are no monsters in encounter", () => {
    render(
      <EncounterDetails
        open
        onMonsterAmountUpdate={vi.fn()}
        encounter={{ monsters: [], difficulty: ENCOUNTER_DIFFICULTY.MEDIUM }}
      />
    );

    expect(
      screen.getByRole("heading", { name: /encounter details/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText("An Empty Battlefield... For Now")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No monsters lurk in the shadows—yet. Add some creatures to build your perfect encounter and give your players a challenge they'll never forget!"
      )
    ).toBeInTheDocument();
  });

  it("should render monsters in encounter with all their information", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const monstersInEncounter = [fakeMonster];

    render(
      <EncounterDetails
        open
        onMonsterAmountUpdate={vi.fn()}
        encounter={{
          monsters: monstersInEncounter,
          difficulty: ENCOUNTER_DIFFICULTY.MEDIUM,
        }}
      />
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

  it("should show encounter difficulty explanation", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const monstersInEncounter = [fakeMonster];

    render(
      <EncounterDetails
        open
        onMonsterAmountUpdate={vi.fn()}
        encounter={{
          monsters: monstersInEncounter,
          difficulty: ENCOUNTER_DIFFICULTY.EASY,
        }}
      />
    );

    const difficultyExplanation = screen.getByText(/easy/i);

    expect(difficultyExplanation).toBeInTheDocument();
  });
});
