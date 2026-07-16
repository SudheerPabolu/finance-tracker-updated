import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

import profileRoutes from "./routes/profileRoutes.js";

import transactionRoutes from "./routes/transactionRoutes.js";

import analyticsRoutes from "./routes/analyticsRoutes.js";

import budgetRoutes from "./routes/budgetRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api/v1/auth",
  authRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use(errorMiddleware);

app.use("/api/v1/profile", profileRoutes);

app.use(
  "/api/v1/transactions",
  transactionRoutes
);

app.use(
  "/api/v1/analytics",
  analyticsRoutes
);

app.use(
  "/api/v1/budgets",
  budgetRoutes
);

export default app;