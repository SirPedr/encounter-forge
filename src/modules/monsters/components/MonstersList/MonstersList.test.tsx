import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMonsterFixture } from "../../fixtures/monster.fixture";
import { MonstersList } from "./MonstersList";

describe("MonstersList", () => {
  it.skip("should render a list of monsters", () => {
    const fakeFirstMonster = createMonsterFixture({ amount: 1 });
    const fakeSecondMonster = createMonsterFixture({ amount: 1 });

    const monsterList = [fakeFirstMonster, fakeSecondMonster];

    render(<MonstersList monsters={monsterList} />);

    const monsterLista = screen.getByRole("list", { name: /monster list/i });
    const listItems = within(monsterLista).getAllByRole("listitem");

    expect(listItems).toHaveLength(monsterList.length);

    expect(screen.getByText(fakeFirstMonster.name)).toBeInTheDocument();
    expect(screen.getByText(fakeSecondMonster.name)).toBeInTheDocument();
  });

  it.todo("should load specific page from query params");
});
