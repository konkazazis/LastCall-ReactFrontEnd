import axios from "axios";
const API_URL = process.env.REACT_APP_URL; // Update with your API URL

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// Function to dynamically set the Authorization header
const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Function to send a GET request to fetch expenses
export const getExpenses = () => {
  setAuthHeader();
  const userId = localStorage.getItem("User");
  return axios
    .get(`${API_URL}/expenses/?user_id=${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a POST request to add an expense
export const addExpense = (expenseData) => {
  return axios
    .post(`${API_URL}/expenses/`, expenseData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a DELETE request to delete an expense by ID
export const deleteExpense = (expenseId) => {
  return axios
    .delete(`${API_URL}api/expense-delete/${expenseId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
