type RangeFilter = {
  min: number;
  max: number;
};

export type GetMonsterFilters = {
  challenge_rating?: RangeFilter;
  xpGeneral?: RangeFilter;
  xpInLair?: RangeFilter;
  environments?: string[];
  type?: string[];
  name?: string;
};

const FILTER_MAP: {
  [Key in keyof GetMonsterFilters]: (
    value: NonNullable<GetMonsterFilters[Key]>
  ) => Record<string, unknown>;
} = {
  challenge_rating: ({ min, max }) => ({
    challenge_rating: {
      gte: min,
      lte: max,
    },
  }),
  xpGeneral: ({ min, max }) => ({
    xpGeneral: {
      gte: min,
      lte: max,
    },
  }),
  xpInLair: ({ min, max }) => ({
    xpInLair: {
      gte: min,
      lte: max,
    },
  }),
  environments: (environments) => ({
    environments: {
      hasSome: environments,
    },
  }),
  type: (type) => ({
    type: {
      hasSome: type,
    },
  }),
};

export const buildMonsterFilters = (filters: GetMonsterFilters) => {
  const validEntries = Object.entries(filters).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value;
  });

  const whereClause = validEntries.reduce((aggregateFilters, [key, value]) => {
    const processCurrentFilter = FILTER_MAP[key as keyof GetMonsterFilters];

    return {
      ...aggregateFilters,
      ...processCurrentFilter?.(value as never),
    };
  }, {} as Record<string, unknown>);

  return whereClause;
};
