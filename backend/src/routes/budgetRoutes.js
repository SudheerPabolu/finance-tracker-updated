import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createBudget,
  getBudgets,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createBudget
);

router.get(
  "/",
  authMiddleware,
  getBudgets
);

router.delete(
  "/:id",
  authMiddleware,
  deleteBudget
);

export default router;