import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createMonsterFixture } from "../../fixtures/monster.fixture";
import { MonsterCard } from "./MonsterCard";

describe("MonsterCard", () => {
  it("should render with all basic information", () => {
    const fakeMonster = createMonsterFixture({
      amount: 1,
      xpGeneral: 10000,
      xpInLair: 30000,
    });

    render(<MonsterCard monster={fakeMonster} />);

    expect(screen.getByText(fakeMonster.name)).toBeInTheDocument();
    expect(screen.getByText("CR 1")).toBeInTheDocument();

    expect(screen.getByText("Type: elemental")).toBeInTheDocument();
    expect(
      screen.getByText("Environments: mountain, planar, air")
    ).toBeInTheDocument();
    expect(screen.getByText("XP: 10000 | In Lair: 30000")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should show amount controls when user clicks on Add button", async () => {
    const fakeMonster = createMonsterFixture({ amount: 1 });
    render(<MonsterCard monster={fakeMonster} />);

    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    expect(
      screen.getByRole("button", {
        name: `Remove 1 ${fakeMonster.name} from encounter`,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: `Add 1 ${fakeMonster.name} from encounter`,
      })
    ).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  describe("Callbacks", () => {
    it("should call onAmountChange when user clicks on Add button", async () => {
      const onAmountChangeSpy = vi.fn();
      const fakeMonster = createMonsterFixture({ amount: 1 });

      render(
        <MonsterCard monster={fakeMonster} onAmountChange={onAmountChangeSpy} />
      );

      const addButton = screen.getByRole("button", { name: "Add" });

      await userEvent.click(addButton);

      expect(onAmountChangeSpy).toHaveBeenCalledTimes(1);
      expect(onAmountChangeSpy).toHaveBeenCalledWith(fakeMonster.id, 1);
    });

    it("should call onAmountChange when user clicks on increase amount button", async () => {
      const onAmountChangeSpy = vi.fn();
      const fakeMonster = createMonsterFixture({ amount: 1 });

      render(
        <MonsterCard monster={fakeMonster} onAmountChange={onAmountChangeSpy} />
      );

      const addButton = screen.getByRole("button", { name: "Add" });

      await userEvent.click(addButton);

      const increaseButton = screen.getByRole("button", {
        name: `Add 1 ${fakeMonster.name} from encounter`,
      });

      await userEvent.click(increaseButton);

      expect(onAmountChangeSpy).toHaveBeenCalledTimes(2);
      expect(onAmountChangeSpy).toHaveBeenLastCalledWith(fakeMonster.id, 2);
    });
  });

  it("should call onAmountChange when user clicks on decrease amount button", async () => {
    const onAmountChangeSpy = vi.fn();
    const fakeMonster = createMonsterFixture({ amount: 1 });

    render(
      <MonsterCard monster={fakeMonster} onAmountChange={onAmountChangeSpy} />
    );

    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    const decreaseButton = screen.getByRole("button", {
      name: `Remove 1 ${fakeMonster.name} from encounter`,
    });

    await userEvent.click(decreaseButton);

    expect(onAmountChangeSpy).toHaveBeenCalledTimes(2);
    expect(onAmountChangeSpy).toHaveBeenLastCalledWith(fakeMonster.id, 0);

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
});
