import { describe, it, expect } from "vitest";
import { buildMonsterFilters, GetMonsterFilters } from "./index";

describe("buildMonsterFilters", () => {
  it.each([
    ["challenge_rating", { min: 1, max: 5 }],
    ["xpGeneral", { min: 1, max: 5 }],
    ["xpInLair", { min: 1, max: 5 }],
  ])("should build filters for %s", (key, filter) => {
    const filters: GetMonsterFilters = {
      challenge_rating: {
        min: null,
        max: null,
      },
      xpGeneral: {
        min: null,
        max: null,
      },
      xpInLair: {
        min: null,
        max: null,
      },
      environments: [],
      type: [],
      [key]: filter,
    };

    expect(buildMonsterFilters(filters)).toEqual({
      [key]: {
        gte: 1,
        lte: 5,
      },
    });
  });

  it("should build filters for environments", () => {
    const filters: GetMonsterFilters = {
      challenge_rating: {
        min: null,
        max: null,
      },
      xpGeneral: {
        min: null,
        max: null,
      },
      xpInLair: {
        min: null,
        max: null,
      },
      environments: ["forest", "swamp"],
      type: [],
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({
      environments: {
        hasSome: ["forest", "swamp"],
      },
    });
  });

  it("should build filters for type", () => {
    const filters: GetMonsterFilters = {
      challenge_rating: {
        min: null,
        max: null,
      },
      xpGeneral: {
        min: null,
        max: null,
      },
      xpInLair: {
        min: null,
        max: null,
      },
      environments: [],
      type: ["dragon", "undead"],
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({
      type: {
        hasSome: ["dragon", "undead"],
      },
    });
  });

  it("should build filters for multiple fields", () => {
    const filters: GetMonsterFilters = {
      challenge_rating: { min: 1, max: 5 },
      xpGeneral: { min: 100, max: 500 },
      xpInLair: { min: 50, max: 300 },
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
      xpInLair: {
        gte: 50,
        lte: 300,
      },
      environments: {
        hasSome: ["forest", "swamp"],
      },
      type: {
        hasSome: ["dragon", "undead"],
      },
    });
  });

  it("should return an empty object if no filters are provided", () => {
    const filters: GetMonsterFilters = {
      challenge_rating: {
        min: null,
        max: null,
      },
      xpGeneral: {
        min: null,
        max: null,
      },
      xpInLair: {
        min: null,
        max: null,
      },
      environments: [],
      type: [],
    };

    const result = buildMonsterFilters(filters);

    expect(result).toEqual({});
  });
});
