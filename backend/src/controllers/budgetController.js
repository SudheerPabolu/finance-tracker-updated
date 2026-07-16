import Budget from "../models/Budget.js";

import Transaction from "../models/Transaction.js";

import { budgetValidator } from "../validators/budgetValidator.js";

export const createBudget =
  async (req, res) => {
    try {
      const validatedData =
        budgetValidator(req);

      const existingBudget =
        await Budget.findOne({
          user: req.user._id,

          category:
            validatedData.category,

          month:
            validatedData.month,

          year:
            validatedData.year,
        });

      if (existingBudget) {
        return res.status(400).json({
          success: false,

          message:
            "Budget already exists for this category and month",
        });
      }

      const budget =
        await Budget.create({
          ...validatedData,

          user: req.user._id,
        });

      return res.status(201).json({
        success: true,

        message:
          "Budget created successfully",

        data: budget,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

export const getBudgets =
  async (req, res) => {
    try {
      const budgets =
        await Budget.find({
          user: req.user._id,
        });

      const updatedBudgets =
        await Promise.all(
          budgets.map(
            async (budget) => {
              const spent =
                await Transaction.aggregate(
                  [
                    {
                      $match: {
                        user:
                          req.user._id,

                        category:
                          budget.category,

                        type:
                          "expense",
                      },
                    },

                    {
                      $group: {
                        _id: null,

                        total: {
                          $sum:
                            "$amount",
                        },
                      },
                    },
                  ]
                );

              const spentAmount =
                spent[0]?.total ||
                0;

              const remaining =
                budget.limitAmount -
                spentAmount;

              const percentage =
                Math.min(
                  (
                    spentAmount /
                    budget.limitAmount
                  ) *
                    100,
                  100
                );

              return {
                ...budget.toObject(),

                spentAmount,

                remaining,

                percentage,
              };
            }
          )
        );

      return res.status(200).json({
        success: true,

        data: updatedBudgets,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };
  export const deleteBudget =
  async (req, res) => {
    try {
      const budget =
        await Budget.findOneAndDelete({
          _id: req.params.id,

          user: req.user._id,
        });

      if (!budget) {
        return res.status(404).json({
          success: false,

          message:
            "Budget not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Budget deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };