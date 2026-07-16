import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

import EditTransactionModal from "../../components/transactions/EditTransactionModal";

import toast from "react-hot-toast";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

const Transactions = () => {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const transactionsPerPage = 5;

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState(null);

  const fetchTransactions =
    async () => {

      try {

        const response =
          await api.get(
            "/transactions"
          );

        setTransactions(
          response.data.data
        );

      } catch (error) {

        toast.error(
          "Failed to fetch transactions"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction =
    async (id) => {

      try {

        await api.delete(
          `/transactions/${id}`
        );

        toast.success(
          "Transaction deleted"
        );

        fetchTransactions();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  const filteredTransactions =
    transactions.filter(
      (transaction) => {

        const matchesFilter =
          filter === "all"
            ? true
            : transaction.type ===
              filter;

        const matchesSearch =
          transaction.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          transaction.category
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          (
            transaction.note ||
            ""
          )
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const transactionDate =
          new Date(
            transaction.createdAt
          );

        const matchesStartDate =
          startDate
            ? transactionDate >=
              new Date(
                startDate
              )
            : true;

        const matchesEndDate =
          endDate
            ? transactionDate <=
              new Date(
                endDate
              )
            : true;

        return (
          matchesFilter &&
          matchesSearch &&
          matchesStartDate &&
          matchesEndDate
        );
      }
    );

  const indexOfLastTransaction =
    currentPage *
    transactionsPerPage;

  const indexOfFirstTransaction =
    indexOfLastTransaction -
    transactionsPerPage;

  const currentTransactions =
    filteredTransactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredTransactions.length /
          transactionsPerPage
      )
    );

  useEffect(() => {

    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(1);
    }

  }, [
    currentPage,
    totalPages,
  ]);

  const openEditModal = (
    transaction
  ) => {

    setSelectedTransaction(
      transaction
    );

    setIsEditOpen(true);
  };

  const exportToExcel =
    () => {

      const formattedData =
        filteredTransactions.map(
          (transaction) => ({
            Title:
              transaction.title,
            Amount:
              transaction.amount,
            Type:
              transaction.type,
            Category:
              transaction.category,
            Note:
              transaction.note,
            Date:
              new Date(
                transaction.createdAt
              ).toLocaleDateString(),
          })
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          formattedData
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transactions"
      );

      const excelBuffer =
        XLSX.write(
          workbook,
          {
            bookType:
              "xlsx",
            type:
              "array",
          }
        );

      const data =
        new Blob(
          [excelBuffer],
          {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          }
        );

      saveAs(
        data,
        "transactions.xlsx"
      );
    };

  const exportToPDF =
    () => {

      const doc =
        new jsPDF();

      doc.setFontSize(18);

      doc.text(
        "Finance Transactions Report",
        14,
        20
      );

      const tableData =
        filteredTransactions.map(
          (transaction) => [
            transaction.title,
            transaction.amount,
            transaction.type,
            transaction.category,
            transaction.note,
            new Date(
              transaction.createdAt
            ).toLocaleDateString(),
          ]
        );

      autoTable(doc, {
        head: [
          [
            "Title",
            "Amount",
            "Type",
            "Category",
            "Note",
            "Date",
          ],
        ],
        body: tableData,
        startY: 30,
      });

      doc.save(
        "transactions.pdf"
      );
    };

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
          lg:flex-row
          lg:items-center
          lg:justify-between
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
              Transactions
            </h1>

            <p
              className="
              text-slate-400
              mt-2
            "
            >
              Manage your financial records
            </p>
          </div>

          <div
            className="
            flex
            flex-wrap
            gap-3
          "
          >
            <button
              onClick={
                exportToExcel
              }
              className="
              bg-green-500
              hover:bg-green-600
              transition
              px-5
              py-3
              rounded-xl
              font-semibold
              text-black
            "
            >
              Export Excel
            </button>

            <button
              onClick={
                exportToPDF
              }
              className="
              bg-red-500
              hover:bg-red-600
              transition
              px-5
              py-3
              rounded-xl
              font-semibold
            "
            >
              Export PDF
            </button>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-3
              rounded-xl
              outline-none
            "
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => {

                setStartDate(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-3
              rounded-xl
              outline-none
            "
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => {

                setEndDate(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-3
              rounded-xl
              outline-none
            "
            />

            <select
              value={filter}
              onChange={(e) => {

                setFilter(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-3
              rounded-xl
              outline-none
            "
            >
              <option value="all">
                All
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
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
              No Transactions Found
            </h2>

            <p
              className="
              text-slate-400
            "
            >
              Try changing filters or search.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentTransactions.map(
                (
                  transaction
                ) => (
                  <div
                    key={
                      transaction._id
                    }
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                  >
                    <div>
                      <h2
                        className="
                        text-xl
                        font-semibold
                      "
                      >
                        {
                          transaction.title
                        }
                      </h2>

                      <p
                        className="
                        text-slate-400
                        mt-1
                      "
                      >
                        {
                          transaction.category
                        }
                      </p>

                      <p
                        className="
                        text-slate-500
                        text-sm
                        mt-1
                      "
                      >
                        {
                          transaction.note
                        }
                      </p>
                    </div>

                    <div
                      className="
                      text-right
                    "
                    >
                      <h2
                        className={`
                        text-2xl
                        font-bold
                        ${
                          transaction.type ===
                          "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      `}
                      >
                        {transaction.type ===
                        "income"
                          ? "+"
                          : "-"}
                        {
                          transaction.amount
                        }
                      </h2>

                      <p
                        className="
                        text-slate-400
                        text-sm
                        mt-1
                      "
                      >
                        {new Date(
                          transaction.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <div
                        className="
                        flex
                        gap-2
                        justify-end
                        mt-3
                      "
                      >
                        <button
                          onClick={() =>
                            openEditModal(
                              transaction
                            )
                          }
                          className="
                          bg-blue-500
                          hover:bg-blue-600
                          transition
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                        "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTransaction(
                              transaction._id
                            )
                          }
                          className="
                          bg-red-500
                          hover:bg-red-600
                          transition
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                        "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              className="
              flex
              justify-center
              items-center
              gap-4
              mt-8
            "
            >
              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
                disabled={
                  currentPage === 1
                }
                className="
                bg-slate-800
                px-4
                py-2
                rounded-xl
                disabled:opacity-50
              "
              >
                Prev
              </button>

              <span
                className="
                font-semibold
              "
              >
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className="
                bg-slate-800
                px-4
                py-2
                rounded-xl
                disabled:opacity-50
              "
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <EditTransactionModal
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
        transaction={
          selectedTransaction
        }
        refreshTransactions={
          fetchTransactions
        }
      />
    </DashboardLayout>
  );
};

export default Transactions;