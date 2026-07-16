import Transaction from "../models/Transaction.js";

export const getAnalytics =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        });

      let totalIncome = 0;

      let totalExpense = 0;

      transactions.forEach(
        (transaction) => {
          if (
            transaction.type ===
            "income"
          ) {
            totalIncome +=
              transaction.amount;
          } else {
            totalExpense +=
              transaction.amount;
          }
        }
      );

      const balance =
        totalIncome -
        totalExpense;

      const recentTransactions =
        await Transaction.find({
          user: req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const categoryData =
        await Transaction.aggregate([
          {
            $match: {
              user:
                req.user._id,

              type:
                "expense",
            },
          },

          {
            $group: {
              _id:
                "$category",

              total: {
                $sum:
                  "$amount",
              },
            },
          },

          {
            $sort: {
              total: -1,
            },
          },
        ]);

      const monthlyTrends =
        await Transaction.aggregate([
          {
            $match: {
              user:
                req.user._id,
            },
          },

          {
            $group: {
              _id: {
                month: {
                  $month:
                    "$createdAt",
                },

                year: {
                  $year:
                    "$createdAt",
                },
              },

              income: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$type",
                        "income",
                      ],
                    },

                    "$amount",

                    0,
                  ],
                },
              },

              expense: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$type",
                        "expense",
                      ],
                    },

                    "$amount",

                    0,
                  ],
                },
              },
            },
          },

          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ]);

      const now =
        new Date();

      const startOfDay =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

      const startOfWeek =
        new Date();

      startOfWeek.setDate(
        now.getDate() - 7
      );

      const startOfMonth =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );

      const startOfYear =
        new Date(
          now.getFullYear(),
          0,
          1
        );

      const calculateOverview =
        (
          filteredTransactions
        ) => {
          let income = 0;

          let expense = 0;

          filteredTransactions.forEach(
            (
              transaction
            ) => {
              if (
                transaction.type ===
                "income"
              ) {
                income +=
                  transaction.amount;
              } else {
                expense +=
                  transaction.amount;
              }
            }
          );

          return {
            income,

            expense,

            balance:
              income -
              expense,
          };
        };

      const dailyOverview =
        calculateOverview(
          transactions.filter(
            (
              transaction
            ) =>
              new Date(
                transaction.createdAt
              ) >=
              startOfDay
          )
        );

      const weeklyOverview =
        calculateOverview(
          transactions.filter(
            (
              transaction
            ) =>
              new Date(
                transaction.createdAt
              ) >=
              startOfWeek
          )
        );

      const monthlyOverview =
        calculateOverview(
          transactions.filter(
            (
              transaction
            ) =>
              new Date(
                transaction.createdAt
              ) >=
              startOfMonth
          )
        );

      const yearlyOverview =
        calculateOverview(
          transactions.filter(
            (
              transaction
            ) =>
              new Date(
                transaction.createdAt
              ) >=
              startOfYear
          )
        );

      return res.status(200).json({
        success: true,

        data: {
          totalIncome,

          totalExpense,

          balance,

          totalTransactions:
            transactions.length,

          recentTransactions,

          categoryData,

          monthlyTrends,

          overview: {
            daily:
              dailyOverview,

            weekly:
              weeklyOverview,

            monthly:
              monthlyOverview,

            yearly:
              yearlyOverview,
          },
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };
  export const updateUsername =
  async (req, res) => {
    try {
      const { username } =
        req.body;

      const existingUser =
        await User.findOne({
          username,
        });

      if (
        existingUser &&
        existingUser._id.toString() !==
          req.user._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Username already exists",
        });
      }

      req.user.username =
        username;

      await req.user.save();

      return res.status(200).json({
        success: true,
        message:
          "Username updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };