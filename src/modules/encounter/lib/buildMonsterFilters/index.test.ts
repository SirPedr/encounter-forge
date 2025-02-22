import { describe, it, expect } from "vitest";
import { buildMonsterFilters, GetMonsterFilters } from "./index";

describe("buildMonsterFilters", () => {
  it("should return an empty object when no filters are provided", () => {
    const filters: GetMonsterFilters = {};
    const result = buildMonsterFilters(filters);

    expect(result).toEqual({});
  });

  it.each([
    [
      "challenge_rating",
      { min: 1, max: 5 },
      { challenge_rating: { gte: 1, lte: 5 } },
    ],
    [
      "xpGeneral",
      { min: 100, max: 500 },
      { xpGeneral: { gte: 100, lte: 500 } },
    ],
    ["xpInLair", { min: 50, max: 300 }, { xpInLair: { gte: 50, lte: 300 } }],
    [
      "environments",
      ["forest", "swamp"],
      { environments: { hasSome: ["forest", "swamp"] } },
    ],
    ["type", ["dragon", "undead"], { type: { hasSome: ["dragon", "undead"] } }],
  ])("should build filters for %s", (key, rawValue, expectedResult) => {
    const filters: GetMonsterFilters = { [key]: rawValue };
    const result = buildMonsterFilters(filters);

    expect(result).toEqual(expectedResult);
  });

  it("should build filters for multiple criteria", () => {
    const filters: GetMonsterFilters = {
      challenge_rating: { min: 1, max: 5 },
      xpGeneral: { min: 100, max: 500 },
      environments: ["forest", "swamp"],
      type: ["dragon", "undead"],
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({
      challenge_rating: {
        gte: 1,
        lte: 5,
      },
      xpGeneral: {
        gte: 100,
        lte: 500,
      },
      environments: {
        hasSome: ["forest", "swamp"],
      },
      type: {
        hasSome: ["dragon", "undead"],
      },
    });
  });

  it("should ignore empty array filters", () => {
    const filters: GetMonsterFilters = {
      environments: [],
      type: [],
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({});
  });

  it("should ignore keys that are not in the filter map", () => {
    const filters: GetMonsterFilters = {
      name: "dragon",
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({});
  });
});
