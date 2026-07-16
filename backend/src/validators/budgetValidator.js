import { z } from "zod";

export const budgetValidator = (
  req
) => {
  const schema = z.object({
    category: z
      .string()
      .min(2, "Category is required"),

    limitAmount: z
      .number()
      .positive(
        "Budget amount must be positive"
      ),

    month: z
      .number()
      .min(1)
      .max(12),

    year: z
      .number()
      .min(2024),
  });

  return schema.parse(req.body);
};