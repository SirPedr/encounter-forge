import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EncounterBuildPage } from ".";
import { EncounterForgeStoreProvider } from "@/providers/zustand";
import { QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "@/providers/reactQuery";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("next-router-mock"),
  useSearchParams: vi.fn(() => new URLSearchParams({ page: "1" })),
}));

const renderEncounterBuildPage = () =>
  render(
    <EncounterForgeStoreProvider>
      <QueryClientProvider
        client={makeQueryClient([[["monsters", { offset: 0 }], []]])}
      >
        <EncounterBuildPage />
      </QueryClientProvider>
    </EncounterForgeStoreProvider>
  );

describe("EncounterBuildPage", () => {
  it("should render with monsters and party tabs ", () => {
    renderEncounterBuildPage();

    expect(screen.getByRole("tab", { name: "Monsters" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Party" })).toBeInTheDocument();
  });

  it("should render monsters tab by default", () => {
    renderEncounterBuildPage();

    expect(
      screen.getByRole("heading", { name: "Monsters" })
    ).toBeInTheDocument();
  });

  it("should render party tab when clicked", async () => {
    renderEncounterBuildPage();

    const partyPageTab = screen.getByRole("tab", { name: "Party" });

    await userEvent.click(partyPageTab);

    expect(
      screen.getByText(/no adventurers have stepped forward yet/i)
    ).toBeInTheDocument();
  });
});
