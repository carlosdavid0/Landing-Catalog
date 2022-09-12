import { Button, Card, Navbar } from "flowbite-react";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function Vendas() {
  const loop = new Array(150).fill(null);
  return (
    <main className="bg-gray-100 dark:bg-slate-700 min-h-screen max-h-full">
      <div className="sticky top-0">
      <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/navbars" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">About</Navbar.Link>
            <Navbar.Link href="/navbars">Services</Navbar.Link>
            <Navbar.Link href="/navbars">Pricing</Navbar.Link>
            <Navbar.Link href="/navbars">Contact</Navbar.Link>
          </Navbar.Collapse>
      </Navbar>
      </div>
      <section className="container auto pt-3">
        <section className="dark:divide-gray-600 divide-y  mx-5">
          <h1 className="text-4xl mt-3.5 mb-2 dark:text-white text-gray-700">
            Vendas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4 select-none ">
            {loop.map((item, index) => (
              <Card>
                <header>
                  <p className="text-sm text-gray-400">Cliente:</p>
                  <h2 className="text-3xl font-semibold dark:text-white text-gray-900">
                    Carlos David
                  </h2>
                </header>

                <div className="-mt-2 flex gap-4">
                  <p className="text-gray-500 text-sm"> 12/09/2022 17:51 </p>
                  <p className="text-gray-500 text-sm">Vendedor: Balcão</p>
                </div>

                <div className="">
                  <p className="text-blue-600 cursor-pointer  hover:underline"> Ver Produtos </p>
                </div>

                <div className="flex gap-4 items-center">
                  <Button color={"failure"}>
                    {" "}
                    <AiFillCloseCircle size={30} />{" "}
                  </Button>
                  <Button color={"success"}>
                    {" "}
                    <AiFillCheckCircle size={30} />{" "}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
