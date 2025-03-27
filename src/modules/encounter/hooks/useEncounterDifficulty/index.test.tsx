import { EncounterForgeStoreProvider } from "@/providers/zustand";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEncounterDifficulty } from ".";
import { ENCOUNTER_DIFFICULTY } from "../../types";
import { createMonsterFixture } from "@/modules/monsters/fixtures/monster.fixture";
import { createPartyFixture } from "@/modules/party/fixtures/party.fixture";
import { EncounterForgeStore } from "@/zustand/store";

const renderUseEncounterDifficulty = (
  initialStore: Partial<EncounterForgeStore>
) =>
  renderHook(() => useEncounterDifficulty(), {
    wrapper: ({ children }) => (
      <EncounterForgeStoreProvider initialStore={initialStore}>
        {children}
      </EncounterForgeStoreProvider>
    ),
  });

describe("useEncounterDifficulty", () => {
  it("should return encounter difficulty if both monsters and party are present", () => {
    const { result } = renderUseEncounterDifficulty({
      monsters: [createMonsterFixture({ challenge_rating: 30 })],
      party: createPartyFixture({ amountOfPlayers: 1, level: 1 }),
    });

    expect(result.current).toEqual(ENCOUNTER_DIFFICULTY.DEADLY);
  });

  it("should return null if no monsters are present", () => {
    const { result } = renderUseEncounterDifficulty({
      monsters: [],
      party: createPartyFixture({ amountOfPlayers: 1, level: 1 }),
    });

    expect(result.current).toBeNull();
  });

  it("should return null if no party is present", () => {
    const { result } = renderUseEncounterDifficulty({
      monsters: [createMonsterFixture({ challenge_rating: 30 })],
      party: [],
    });

    expect(result.current).toBeNull();
  });
});
