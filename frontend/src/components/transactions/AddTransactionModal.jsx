import { useState } from "react";

import api from "../../services/api";

import toast from "react-hot-toast";

const AddTransactionModal = ({ isOpen, onClose, refreshAnalytics }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =
  async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/transactions",
        {
          ...formData,

          amount: Number(
            formData.amount
          ),
        }
      );

      toast.success(
        "Transaction added successfully"
      );

      refreshAnalytics();

      onClose();

      setFormData({
        title: "",

        amount: "",

        type: "expense",

        category: "",

        note: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to add transaction"
      );
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-slate-900
        p-8
        rounded-2xl
        w-full
        max-w-lg
        border
        border-slate-800
      "
      >
        <div
          className="
          flex
          items-center
          justify-between
          mb-6
        "
        >
          <h2
            className="
            text-2xl
            font-bold
          "
          >
            Add Transaction
          </h2>

          <button
            onClick={onClose}
            className="
            text-slate-400
            hover:text-white
          "
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="
            w-full
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
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-3
            outline-none
          "
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-3
            outline-none
          "
          >
            <option value="income">Income</option>

            <option value="expense">Expense</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
  w-full
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

            <option value="Salary">Salary</option>

            <option value="Entertainment">Entertainment</option>

            <option value="Health">Health</option>

            <option value="Education">Education</option>

            <option value="Investment">Investment</option>

            <option value="Others">Others</option>
          </select>
          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-3
            outline-none
          "
          />

          <button
            type="submit"
            className="
            w-full
            bg-green-500
            hover:bg-green-600
            transition
            py-3
            rounded-xl
            font-semibold
            text-black
          "
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
