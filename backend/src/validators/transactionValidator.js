import { z } from "zod";

export const transactionValidator = (
  req
) => {
  const schema = z.object({
    title: z
      .string()
      .min(1, "Title is required"),

    amount: z.number(),

    type: z.enum([
      "income",
      "expense",
    ]),

    category: z
      .string()
      .min(1, "Category is required"),

    note: z.string().optional(),

    date: z.string().optional(),
  });

  return schema.parse(req.body);
};