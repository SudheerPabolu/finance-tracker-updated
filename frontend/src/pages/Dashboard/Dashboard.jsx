import { useEffect, useState } from "react";

import api from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout.jsx";

import { useAuth } from "../../context/AuthContext.jsx";

import AddTransactionModal from "../../components/transactions/AddTransactionModal.jsx";

import StatCard from "../../components/dashboard/StatCard";

import toast from "react-hot-toast";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/analytics");

      setAnalytics(response.data.data);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, 
  []);
  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          flex
          items-center
          justify-center
          h-[60vh]
        "
        >
          <div
            className="
            animate-spin
            rounded-full
            h-16
            w-16
            border-b-2
            border-green-400
          "
          ></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div
          className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        "
        >
          <div>
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              Dashboard
            </h1>

            <p
              className="
              text-slate-400
              mt-2
            "
            >
              Track your finances efficiently
            </p>
          </div>
        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
        >
          <StatCard
            title="Total Income"
            value={analytics.totalIncome}
            color="text-green-400"
            trend="Income overview"
          />

          <StatCard
            title="Total Expense"
            value={analytics.totalExpense}
            color="text-red-400"
            trend="Expense overview"
          />

          <StatCard
            title="Balance"
            value={analytics.balance}
            color="text-blue-400"
            trend="Current balance"
          />

          <StatCard
            title="Transactions"
            value={analytics.totalTransactions}
            color="text-yellow-400"
            trend="Total records"
          />
        </div>

        <div
          className="
          mt-10
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-6
          "
          >
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              Recent Transactions
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="
              bg-green-500
              hover:bg-green-600
              transition
              px-4
              py-2
              rounded-xl
              font-semibold
              text-black
            "
            >
              + Add Transaction
            </button>
          </div>

          <div className="space-y-4">
            {analytics.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  bg-slate-800
                  p-4
                  rounded-xl
                "
              >
                <div>
                  <h3
                    className="
                      font-semibold
                      text-lg
                    "
                  >
                    {transaction.title}
                  </h3>

                  <p
                    className="
                      text-slate-400
                      text-sm
                    "
                  >
                    {transaction.category}
                  </p>
                </div>

                <div
                  className="
                    text-right
                  "
                >
                  <h3
                    className={`
                      text-xl
                      font-bold
                      ${
                        transaction.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    `}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount}
                  </h3>

                  <p
                    className="
                      text-slate-400
                      text-sm
                    "
                  >
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshAnalytics={fetchAnalytics}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
