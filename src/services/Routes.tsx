import React from 'react'


import { Routes as Router, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import App from '../App';
import Vendas from '../pages/Vendas';

export default function Routes() {
  return (
    <Router>
        <Route path="/" element={<App />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="*" element={<Navigate to="/" />} />
        
    </Router>
  )
}
