import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import Nav from "./Nav";

export default function Global() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token =  localStorage.getItem("token");
 
    
    api
      .post("/verify", { token })
      .then((response) => {
        setTimeout(() => {
          api.defaults.headers.common["Authorization"] = `${token}` || '';
          setLoading(false);
        }, 2000)
      })
      .catch((error) => {
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/dashboard/login");
        }, 2000);
      });
  }, []);
  return (
    <main className="bg-slate-800">
      {!loading ? (
        <div className="flex ">
          <Nav />
          <section className="p-3 dark:bg-slate-900 bg-gray-200 w-screen">
            <div className=" dark:bg-slate-800 bg-white p-5 h-full rounded-sm">
              <Outlet />
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center h-screen gap-2">
          <h1 className="text-white text-lg">Comercial Angelim</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300 text-gray-400"></div>
        </div>
      )}
    </main>
  );
}
