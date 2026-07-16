import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#eab308",
  "#a855f7",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
  "#f43f5e",
];

const CategoryChart = ({
  categoryData,
}) => {

  const formattedData =
    categoryData.map(
      (item) => ({
        category:
          item._id,
        amount:
          item.total,
      })
    );

  const totalExpense =
    formattedData.reduce(
      (
        acc,
        curr
      ) =>
        acc +
        curr.amount,
      0
    );

  return (
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
      <h2
        className="
        text-2xl
        font-bold
        mb-8
      "
      >
        Expense Categories
      </h2>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
        items-center
      "
      >
        <div
          className="
          h-[400px]
        "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={
                  formattedData
                }
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={150}
                paddingAngle={3}
              >
                {formattedData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          className="
          space-y-5
        "
        >
          {formattedData.map(
            (
              item,
              index
            ) => {

              const percent =
                (
                  (item.amount /
                    totalExpense) *
                  100
                ).toFixed(1);

              return (
                <div
                  key={index}
                  className="
                  bg-slate-800
                  rounded-xl
                  p-5
                "
                >
                  <div
                    className="
                    flex
                    justify-between
                    items-center
                    mb-3
                  "
                  >
                    <h3
                      className="
                      font-semibold
                      text-lg
                    "
                    >
                      {
                        item.category
                      }
                    </h3>

                    <span
                      className="
                      text-slate-300
                      font-medium
                    "
                    >
                      {
                        percent
                      }
                      %
                    </span>
                  </div>

                  <div
                    className="
                    w-full
                    h-3
                    bg-slate-700
                    rounded-full
                    overflow-hidden
                  "
                  >
                    <div
                      className="
                      h-full
                      rounded-full
                    "
                      style={{
                        width: `${percent}%`,
                        backgroundColor:
                          COLORS[
                            index %
                              COLORS.length
                          ],
                      }}
                    ></div>
                  </div>

                  <div
                    className="
                    mt-3
                    text-slate-400
                    text-sm
                  "
                  >
                    Total Expense:
                    <span
                      className="
                      text-white
                      ml-2
                      font-semibold
                    "
                    >
                      ₹
                      {
                        item.amount
                      }
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;