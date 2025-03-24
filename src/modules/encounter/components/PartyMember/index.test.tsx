import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PartyMember } from ".";

describe("PartyMember", () => {
  it("should render level select with levels from 1 to 20", () => {
    render(<PartyMember name="Dio Brando" level={3} id="d10br4nd0" />);

    const levelSelect = screen.getByRole("combobox", { name: "Level" });

    expect(levelSelect).toBeInTheDocument();

    const levelOptions = screen.getAllByRole("option");

    expect(levelOptions).toHaveLength(20);

    levelOptions.forEach((option, index) => {
      expect(option).toHaveValue((index + 1).toString());
    });
  });
});
