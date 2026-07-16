import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

import toast from "react-hot-toast";

import FinanceChart from "../../charts/FinanceChart";

import CategoryChart from "../../charts/CategoryChart";

import MonthlyTrendChart from "../../charts/MonthlyTrendChart";

const Analytics = () => {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await api.get(
            "/analytics"
          );

        setAnalytics(
          response.data.data
        );

      } catch (error) {

        toast.error(
          "Failed to load analytics"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          flex
          items-center
          justify-center
          h-[60vh]
          text-2xl
          font-semibold
        "
        >
          Loading Analytics...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
        pb-10
      "
      >
        <div
          className="
          mb-10
        "
        >
          <h1
            className="
            text-5xl
            font-bold
          "
          >
            Analytics
          </h1>

          <p
            className="
            text-slate-400
            mt-3
            text-lg
          "
          >
            Visualize your financial insights
          </p>
        </div>

        <div
          className="
          space-y-10
        "
        >
          <div>
            
            <FinanceChart
              analytics={
                analytics
              }
            />
          </div>

          <div>
            

            <CategoryChart
              categoryData={
                analytics.categoryData
              }
            />
          </div>

          <div>
            

            <MonthlyTrendChart
              monthlyTrends={
                analytics.monthlyTrends
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;