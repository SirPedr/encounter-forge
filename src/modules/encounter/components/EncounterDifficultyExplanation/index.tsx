import { ENCOUNTER_DIFFICULTY } from "../../types";
import { DIFFICULTY_TEXTS } from "./difficultyTexts";

type Props = {
  difficulty: ENCOUNTER_DIFFICULTY;
};

export const EncounterDifficultyExplanation = ({ difficulty }: Props) => {
  const { title, description } = DIFFICULTY_TEXTS[difficulty];

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </section>
  );
};
