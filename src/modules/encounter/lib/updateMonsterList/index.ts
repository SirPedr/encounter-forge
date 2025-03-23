import { EncounterMonster } from "../../types";

export const updateMonsterList = (
  updatedMonster: EncounterMonster,
  monsterList: EncounterMonster[]
) => {
  if (updatedMonster.amount === 0) {
    return monsterList.filter((monster) => monster.id !== updatedMonster.id);
  }

  const isMonsterInList = monsterList.some(
    (monster) => monster.id === updatedMonster.id
  );

  if (!isMonsterInList) {
    return [...monsterList, updatedMonster];
  }

  return monsterList.map((monster) =>
    monster.id === updatedMonster.id ? updatedMonster : monster
  );
};
