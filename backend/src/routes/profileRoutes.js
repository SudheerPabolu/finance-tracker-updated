import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  getProfile
);

export default router;