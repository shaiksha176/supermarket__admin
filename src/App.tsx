import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/orders/Orders";
import Layout from "./layout/Layout";
import Users from "./pages/users/Users";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default App;
