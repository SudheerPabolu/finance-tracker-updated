import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    category: "",
    limitAmount: "",
    month: "",
    year: "",
  });

  const fetchBudgets = async () => {
    try {
      const response = await api.get("/budgets");

      setBudgets(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/budgets", {
        ...formData,
        limitAmount: Number(formData.limitAmount),

        month: Number(formData.month),

        year: Number(formData.year),
      });

      fetchBudgets();

      setFormData({
        category: "",
        limitAmount: "",
        month: "",
        year: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }
  const deleteBudget = async (id) => {
    try {
      await api.delete(`/budgets/${id}`);

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1
            className="
            text-4xl
            font-bold
            mb-3
          "
          >
            Budgets
          </h1>

          <p
            className="
            text-slate-400
          "
          >
            Manage your monthly spending limits
          </p>
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
          mb-10
        "
        >
          <h2
            className="
            text-2xl
            font-bold
            mb-6
          "
          >
            Create Budget
          </h2>

          <form
            onSubmit={handleSubmit}
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
          >
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              outline-none
            "
              required
            >
              <option value="">Select Category</option>

              <option value="Food">Food</option>

              <option value="Travel">Travel</option>

              <option value="Shopping">Shopping</option>

              <option value="Bills">Bills</option>

              <option value="Entertainment">Entertainment</option>

              <option value="Health">Health</option>

              <option value="Others">Others</option>
            </select>

            <input
              type="number"
              name="limitAmount"
              placeholder="Budget Amount"
              value={formData.limitAmount}
              onChange={handleChange}
              className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              outline-none
            "
              required
            />

            <input
              type="number"
              name="month"
              placeholder="Month (1-12)"
              value={formData.month}
              onChange={handleChange}
              className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              outline-none
            "
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              outline-none
            "
              required
            />

            <button
              type="submit"
              className="
              md:col-span-2
              bg-green-500
              hover:bg-green-600
              transition
              py-3
              rounded-xl
              font-semibold
              text-black
            "
            >
              Create Budget
            </button>
          </form>
        </div>

        {budgets.length === 0 ? (
          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-10
            text-center
          "
          >
            <h2
              className="
              text-2xl
              font-bold
              mb-3
            "
            >
              No Budgets Created
            </h2>

            <p
              className="
              text-slate-400
            "
            >
              Create your first budget to start tracking spending limits.
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
          >
            {budgets.map((budget) => (
              <div
                key={budget._id}
                className="
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
        items-center
        justify-between
        mb-4
      "
                >
                  <h2
                    className="
          text-2xl
          font-bold
        "
                  >
                    {budget.category}
                  </h2>

                  <span
                    className={`
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
          ${
            budget.percentage >= 100
              ? "bg-red-500 text-white"
              : budget.percentage >= 80
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-black"
          }
        `}
                  >
                    {Math.round(budget.percentage)}%
                  </span>
                </div>

                <div className="mb-4">
                  <div
                    className="
          flex
          justify-between
          text-sm
          text-slate-400
          mb-2
        "
                  >
                    <span>₹{budget.spentAmount} spent</span>

                    <span>₹{budget.limitAmount}</span>
                  </div>

                  <div
                    className="
          w-full
          h-3
          bg-slate-800
          rounded-full
          overflow-hidden
        "
                  >
                    <div
                      style={{
                        width: `${budget.percentage}%`,
                      }}
                      className={`
            h-full
            ${
              budget.percentage >= 100
                ? "bg-red-500"
                : budget.percentage >= 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }
          `}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => deleteBudget(budget._id)}
                    className="
  mt-6
  w-full
  bg-red-500
  hover:bg-red-600
  transition
  py-3
  rounded-xl
  font-semibold
"
                  >
                    Delete Budget
                  </button>
                  <p
                    className="
          text-slate-400
        "
                  >
                    Budget: ₹{budget.limitAmount}
                  </p>

                  <p
                    className="
          text-slate-400
        "
                  >
                    Remaining: ₹{budget.remaining}
                  </p>

                  <p
                    className="
          text-slate-400
        "
                  >
                    Month: {budget.month}
                  </p>

                  <p
                    className="
          text-slate-400
        "
                  >
                    Year: {budget.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
