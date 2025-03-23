import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";
import { describe, expect, it } from "vitest";
import { updateMonsterList } from ".";

describe("updateMonsterList", () => {
  it("should add monster to list when given monster that is not in list", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });

    const result = updateMonsterList(fakeMonster, []);

    expect(result).toEqual([fakeMonster]);
  });

  it("should remove monster from list when given monster that is in list and has amount 0", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const initialList = [fakeMonster];

    const result = updateMonsterList(
      { ...fakeMonster, amount: 0 },
      initialList
    );

    expect(result).toEqual([]);
  });

  it("should update monster in list when given monster that is in list and has amount greater than 0", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const initialList = [fakeMonster];
    const updatedMonster = { ...fakeMonster, amount: 2 };

    const result = updateMonsterList(updatedMonster, initialList);

    expect(result).toEqual([updatedMonster]);
  });

  it("should append monster to list when given monster that is not in list", () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    const initialList = [createMonsterFixture({ amount: 2 })];

    const result = updateMonsterList(fakeMonster, initialList);

    expect(result).toEqual([...initialList, fakeMonster]);
  });
});
