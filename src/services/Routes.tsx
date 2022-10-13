import React from "react";

import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "../App";
import Login from "../pages/dashboard/login";
import VendaDetalhe from "../pages/VendaDetalhe";
import Vendas from "../pages/dashboard/Vendas";
import Nav from "../components/Global";
import Dashboard from "../pages/dashboard";
import Users from "../pages/dashboard/Users";

export default function Routes() {
  return (
    <Router>
      <Route path="/" element={<App />} />
      <Route path="/dashboard/login" element={<Login />} />
      <Route path="/dashboard" element={<Nav />}>
        <Route index element={<Dashboard />} />
        <Route path="vendas" element={<Vendas />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<Navigate to="/dashboard/login" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Router>
  );
}
