import {
  Line,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTrendChart = ({
  monthlyTrends,
}) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels:
      monthlyTrends.map(
        (item) =>
          `${
            monthNames[
              item._id.month -
                1
            ]
          } ${
            item._id.year
          }`
      ),

    datasets: [
      {
        label: "Income",

        data:
          monthlyTrends.map(
            (item) =>
              item.income
          ),

        borderColor:
          "#22c55e",

        backgroundColor:
          "#22c55e",

        tension: 0.4,
      },

      {
        label: "Expense",

        data:
          monthlyTrends.map(
            (item) =>
              item.expense
          ),

        borderColor:
          "#ef4444",

        backgroundColor:
          "#ef4444",

        tension: 0.4,
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
        Monthly Financial Trends
      </h2>

      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default MonthlyTrendChart;