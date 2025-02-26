export const getDeadlyThreshold = (
  minimumPartyLevel: number,
  totalPartyLevel: number
) => {
  if (minimumPartyLevel >= 17) {
    return totalPartyLevel;
  }

  if (minimumPartyLevel >= 11) {
    return totalPartyLevel * (3 / 4);
  }

  if (minimumPartyLevel >= 5) {
    return totalPartyLevel / 2;
  }

  return totalPartyLevel / 4;
};
