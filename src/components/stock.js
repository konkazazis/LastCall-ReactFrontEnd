import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { getExpenses, deleteExpense, addExpense } from "../Services/requests";

Modal.setAppElement("#root");

function Stock() {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const token = localStorage.getItem("token");
  const stockItems = ["Tomato Jiuce", "Milk", "Pork", "Beef"];
  const [expenseData, setExpenseData] = useState({
    amount: "",
    date: "",
    description: "",
    user: "",
    token: token,
  });

  // Function to fetch expenses
  const fetchExpenses = () => {
    getExpenses()
      .then((data) => {
        setExpenses(data);
        console.log("Expenses fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };
  useEffect(fetchExpenses, []);

  const postExpense = () => {
    addExpense(expenseData)
      .then((data) => {
        console.log("Expense added:", data);
      })
      .catch((error) => {
        console.error("Error adding expenses:", error);
      });
  };

  const deleteExpenseItem = (id) => {
    deleteExpense(id)
      .then((data) => {
        console.log("Expense deleted:", data);
        fetchExpenses();
      })
      .catch((error) => {
        console.error("Error deleting expenses:", error);
      });
  };

  // monitors changes in the form and updates the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  // handles the submit of the form and passes the expenseData to the addExpense function
  const handleSubmit = (e) => {
    e.preventDefault();
    postExpense();
    setIsModalOpen(false);
    fetchExpenses();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="animate__animated animate__fadeIn m-2">
      <button
        className="bg-white p-2 rounded-md float-right"
        onClick={setIsModalOpen}
      >
        Add Item
      </button>
      <div>
        <h2 className="text-2xl font-bold mb-4">Stock</h2>
        {expenses.length !== 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Photos</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">{expense.id}</td>
                  <td className="border px-4 py-2">{expense.description}</td>
                  <td className="border px-4 py-2">{expense.description}</td>
                  <td className="border px-4 py-2">{expense.amount}</td>
                  <td className="border px-4 py-2">{expense.date}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteExpenseItem(expense.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p>No expenses to show</p>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        contentLabel="Add Expense Modal"
        className="w-[500px] h-[400px] p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg z-50"
        overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-500 z-40"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Stock Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold">
                Photo:
              </label>
              <label htmlFor="description" className="block font-semibold">
                Description:
              </label>
              <select
                id="description"
                name="description"
                value={expenseData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select an Expense Type</option>
                {stockItems.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block font-semibold">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={expenseData.amount}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block font-semibold">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Stock;
