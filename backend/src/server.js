import dotenv from "dotenv";

import path from "path";

import express from "express";

dotenv.config();

import app from "./app.js";

import connectDB from "./config/db.js";

import env from "./config/env.js";

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "src/uploads"
    )
  )
);

const startServer =
  async () => {
    await connectDB();

    app.listen(
      env.PORT,
      () => {
        console.log(
          `Server running on port ${env.PORT}`
        );
      }
    );
  };

startServer();