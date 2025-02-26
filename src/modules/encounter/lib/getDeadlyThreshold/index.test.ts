import { describe, it, expect } from "vitest";
import { getDeadlyThreshold } from "./index";

describe("getDeadlyThreshold", () => {
  it("should return a quarter of total party level when party level is between 1 and 4", () => {
    expect(getDeadlyThreshold(4, 100)).toBe(25);
    expect(getDeadlyThreshold(1, 200)).toBe(50);
  });

  it("should return three quarters of total party level when party level is between 11 and 15", () => {
    expect(getDeadlyThreshold(11, 100)).toBe(75);
    expect(getDeadlyThreshold(15, 200)).toBe(150);
  });

  it("should return half of total party level when party level is between 5 and 10", () => {
    expect(getDeadlyThreshold(5, 100)).toBe(50);
    expect(getDeadlyThreshold(10, 200)).toBe(100);
  });
});
