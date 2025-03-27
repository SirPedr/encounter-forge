import { ENCOUNTER_DIFFICULTY } from "../../types";

type DifficultyText = {
  title: string;
  description: string;
};

export const DIFFICULTY_TEXTS: Record<ENCOUNTER_DIFFICULTY, DifficultyText> = {
  [ENCOUNTER_DIFFICULTY.EASY]: {
    title: "Easy - A Walk in the Park",
    description:
      "This encounter won't push the party too hard. Expect a quick skirmish where the adventurers stay in control—unless they get careless.",
  },
  [ENCOUNTER_DIFFICULTY.MEDIUM]: {
    title: "Medium - A Fair Challenge",
    description:
      "The party will need to stay sharp, but they should come out on top. This encounter demands strategy, but it won't break them—probably.",
  },
  [ENCOUNTER_DIFFICULTY.HARD]: {
    title: "Hard - A Battle to Remember",
    description:
      "Things are getting dangerous. The party will have to fight smart, use their resources wisely, and maybe even rely on a little luck.",
  },
  [ENCOUNTER_DIFFICULTY.DEADLY]: {
    title: "Deadly - A Fight for Survival",
    description:
      "This encounter pulls no punches. A single mistake could mean disaster, and survival is far from guaranteed. Are they ready?",
  },
};
