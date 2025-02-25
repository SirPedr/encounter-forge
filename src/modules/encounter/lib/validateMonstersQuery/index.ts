import { z } from "zod";

const toNumber = (value?: string | null) => (value ? parseFloat(value) : null);

const RANGE_FILTER_SCHEMA = z
  .object({
    min: z.string().nullish().transform(toNumber),
    max: z.string().nullish().transform(toNumber),
  })
  .refine(
    (range) => {
      const rangeValues = Object.values(range);
      if (rangeValues.every((value) => value === null)) {
        return true;
      }

      return rangeValues.every((value) => value !== null);
    },
    { message: "Both 'min' and 'max' must be provided together or not at all." }
  )
  .refine((range) => (range.max && range.min ? range.max >= range.min : true), {
    message: "max must be greater than or equal to min",
  });

export const QUERY_SCHEMA = z.object({
  pagination: z.object({
    offset: z.coerce.number().gte(0),
    limit: z.coerce.number().gt(0),
  }),
  filters: z.object({
    challenge_rating: RANGE_FILTER_SCHEMA,
    xpGeneral: RANGE_FILTER_SCHEMA,
    xpInLair: RANGE_FILTER_SCHEMA,
    environments: z.array(z.string()).nullish(),
    type: z.array(z.string()).nullish(),
    name: z.string().nullish(),
  }),
});

export type GetMonstersParams = z.infer<typeof QUERY_SCHEMA>;
