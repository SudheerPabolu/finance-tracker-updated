import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";

import Signup from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";

import Transactions from "../pages/transactions/Transactions";

import Analytics from "../pages/analytics/Analytics";

import Budgets from "../pages/budgets/Budgets";

import Profile from "../pages/profile/Profile";

import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/transactions"
          element={user ? <Transactions /> : <Navigate to="/login" />}
        />

        <Route
          path="/analytics"
          element={user ? <Analytics /> : <Navigate to="/login" />}
        />

        <Route
          path="/budgets"
          element={user ? <Budgets /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
