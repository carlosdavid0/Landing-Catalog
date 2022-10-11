import React from "react";

import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "../App";
import Login from "../pages/dashboard/login";
import VendaDetalhe from "../pages/VendaDetalhe";
import Vendas from "../pages/dashboard/Vendas";

export default function Routes() {
  return (
    <Router>
      <Route path="/" element={<App />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/venda/:id" element={<VendaDetalhe />} />

      <Route path="/dashboard/">
        <Route path="login" element={<Login />} />
        <Route path="t" element={<Outlet />}>
          <Route index={true} element={<h1>David</h1>} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard/login" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Router>
  );
}
