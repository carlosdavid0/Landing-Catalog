import React, { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { iUserDTO } from "../interfaces/iUsuarios";
export default function Nav() {
  const [themes, setThemes] = useState("");

  const [user, setUser] = useState<iUserDTO>();

  const location = useLocation();
  const navigate = useNavigate();

  function activeRoute(routeName: string) {
    return location.pathname.substring(1) == routeName.substring(1)
      ? true
      : false;
  }

  function navigateTo(routeName: string) {
    navigate(routeName);
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
      setThemes(theme);
    } else {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      setThemes("light");
    }
  }, []);

  function handleTheme(e: boolean) {
    const body = document.querySelector("body");

    if (e) {
      body?.classList.toggle("dark");
      localStorage.setItem("theme", "dark");
      setThemes("dark");
    } else {
      body?.classList.toggle("dark");
      localStorage.setItem("theme", "light");
      setThemes("light");
    }
  }

  useEffect(() => {
    api.get('/user').then(response => {
      setUser(response.data);
    }).catch(error => {
      console.log(error)
    })
  },[])

  return (
    <div className="sticky top-0 h-screen">
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              onClick={() => navigateTo("/dashboard")}
              style={{ cursor: "pointer" }}
              active={activeRoute("/dashboard")}
              icon={HomeIcon}
            >
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item
              onClick={() => navigateTo("/dashboard/vendas")}
              style={{ cursor: "pointer" }}
              active={activeRoute("/dashboard/vendas")}
              icon={ShoppingBagIcon}
            >
              Vendas
            </Sidebar.Item>

            <Sidebar.Item
              onClick={() => navigateTo("/dashboard/produtos")}
              style={{ cursor: "pointer" }}
              active={activeRoute("/dashboard/produtos")}
              icon={BookOpenIcon}
            >
              Produtos
            </Sidebar.Item>

            <Sidebar.Item
              onClick={() => navigateTo("/dashboard/users")}
              style={{ cursor: "pointer" }}
              active={activeRoute("/dashboard/users")}
              icon={UserGroupIcon}
            >
              Usuários
            </Sidebar.Item>
         
          </Sidebar.ItemGroup>
        </Sidebar.Items>

        <div className="absolute bottom-4 flex gap-x-10 items-center ">
          <div className="flex gap-3 item">
            <Avatar rounded img={user?.avatar} />
            <div className="flex flex-col gap-1">
              <h1 className="dark:text-gray-400 text-gray-800 font-semibold text-md">
                {user?.name}
              </h1>
              <div className="flex gap-2 items-center">
                <button>
                  <Cog6ToothIcon className="h-5 w-5 text-gray-600 dark:text-gray-500" />
                </button>
                <button>
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600 dark:text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <button>
              {themes === "light" ? (
                <SunIcon
                  className="h-6 w-6 text-gray-500"
                  onClick={() => handleTheme(true)}
                />
              ) : (
                <MoonIcon
                  className="h-6 w-6 text-gray-400"
                  onClick={() => handleTheme(false)}
                />
              )}
            </button>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
