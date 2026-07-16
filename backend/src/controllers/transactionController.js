import Transaction from "../models/Transaction.js";

import { transactionValidator } from "../validators/transactionValidator.js";

export const createTransaction =
  async (req, res) => {
    try {
      const validatedData =
        transactionValidator(req);

      const transaction =
        await Transaction.create({
          ...validatedData,
          user: req.user._id,
        });

      return res.status(201).json({
        success: true,
        message:
          "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getTransactions =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const updateTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message:
            "Transaction not found",
        });
      }

      Object.assign(
        transaction,
        req.body
      );

      await transaction.save();

      return res.status(200).json({
        success: true,
        message:
          "Transaction updated successfully",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message:
            "Transaction not found",
        });
      }

      await transaction.deleteOne();

      return res.status(200).json({
        success: true,
        message:
          "Transaction deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };