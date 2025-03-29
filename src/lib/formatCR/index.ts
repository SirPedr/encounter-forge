export const formatCR = (challengeRating: number): string => {
  if (challengeRating < 1) {
    if (challengeRating === 0.125) return "1/8";
    if (challengeRating === 0.25) return "1/4";
    if (challengeRating === 0.5) return "1/2";

    return `1/${Math.round(1 / challengeRating)}`;
  }

  return challengeRating.toString();
};
