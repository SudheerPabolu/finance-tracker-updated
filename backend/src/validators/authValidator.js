import { z } from "zod";

export const registerValidator = (req) => {
  const schema = z.object({
    username: z
      .string()
      .min(3, "Username is required"),

    email: z
      .string()
      .email("Valid email is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  });

  return schema.parse(req.body);
};

export const loginValidator = (req) => {
  const schema = z.object({
    email: z
      .string()
      .email("Valid email is required"),

    password: z
      .string()
      .min(6, "Password is required"),
  });

  return schema.parse(req.body);
};