import {
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinanceChart = ({
  analytics,
}) => {
  if (
    !analytics ||
    !analytics.overview
  ) {
    return null;
  }

  const data = {
    labels: [
      "Daily",
      "Weekly",
      "Monthly",
      "Yearly",
    ],

    datasets: [
      {
        label: "Income",

        data: [
          analytics.overview
            .daily.income,

          analytics.overview
            .weekly.income,

          analytics.overview
            .monthly.income,

          analytics.overview
            .yearly.income,
        ],

        backgroundColor:
          "#22c55e",
      },

      {
        label: "Expense",

        data: [
          analytics.overview
            .daily.expense,

          analytics.overview
            .weekly.expense,

          analytics.overview
            .monthly.expense,

          analytics.overview
            .yearly.expense,
        ],

        backgroundColor:
          "#ef4444",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-6
      mt-10
    "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        Financial Overview
      </h2>

      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

export default FinanceChart;