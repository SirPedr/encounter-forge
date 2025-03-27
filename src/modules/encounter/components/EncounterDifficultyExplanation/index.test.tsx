import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EncounterDifficultyExplanation } from ".";
import { ENCOUNTER_DIFFICULTY } from "../../types";

describe("EncounterDifficultyExplanation", () => {
  it.each([
    {
      difficulty: ENCOUNTER_DIFFICULTY.EASY,
      title: "Easy - A Walk in the Park",
      description:
        "This encounter won't push the party too hard. Expect a quick skirmish where the adventurers stay in control—unless they get careless.",
    },
    {
      difficulty: ENCOUNTER_DIFFICULTY.MEDIUM,
      title: "Medium - A Fair Challenge",
      description:
        "The party will need to stay sharp, but they should come out on top. This encounter demands strategy, but it won't break them—probably.",
    },
    {
      difficulty: ENCOUNTER_DIFFICULTY.HARD,
      title: "Hard - A Battle to Remember",
      description:
        "Things are getting dangerous. The party will have to fight smart, use their resources wisely, and maybe even rely on a little luck.",
    },
    {
      difficulty: ENCOUNTER_DIFFICULTY.DEADLY,
      title: "Deadly - A Fight for Survival",
      description:
        "This encounter pulls no punches. A single mistake could mean disaster, and survival is far from guaranteed. Are they ready?",
    },
  ])(
    "should render correct texts for $difficulty difficulty",
    ({ difficulty, title, description }) => {
      render(<EncounterDifficultyExplanation difficulty={difficulty} />);

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  );
});
