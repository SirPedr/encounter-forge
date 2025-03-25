import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PartyMember } from ".";
import userEvent from "@testing-library/user-event";

describe("PartyMember", () => {
  it("should render level select with levels from 1 to 20", async () => {
    render(
      <PartyMember
        name="Dio Brando"
        level={3}
        id="d10br4nd0"
        onRemove={vi.fn()}
        onUpdate={vi.fn()}
      />
    );

    const levelSelect = screen.getByRole("combobox", { name: "Level" });

    expect(levelSelect).toBeInTheDocument();

    await userEvent.click(levelSelect);

    const levelOptions = screen.getAllByRole("option");

    expect(levelOptions).toHaveLength(20);

    levelOptions.forEach((option, index) => {
      expect(within(option).getByText(index + 1)).toBeInTheDocument();
    });
  });
});
