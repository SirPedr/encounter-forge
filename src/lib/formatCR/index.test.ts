import { describe, it, expect } from "vitest";
import { formatCR } from ".";

describe("formatCR", () => {
  it.each([
    ["1/8", 0.125],
    ["1/4", 0.25],
    ["1/2", 0.5],
  ])("should return %s for CR %d", (expected, cr) => {
    expect(formatCR(cr)).toBe(expected);
  });

  it.each([
    ["1", 1],
    ["5", 5],
    ["10", 10],
  ])("should return %s for CR %d", (expected, cr) => {
    expect(formatCR(cr)).toBe(expected);
  });

  it("should handle custom fractions", () => {
    expect(formatCR(0.2)).toBe("1/5");
    expect(formatCR(0.1)).toBe("1/10");
  });
});
