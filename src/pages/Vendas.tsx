import { Button, Card, Modal, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function Vendas() {
  const [modal, setModal] = useState(false);

  const loop = new Array(150).fill(null);
  const teste = new Array(12).fill(null);

  document.title = "Dashboard - SysAngelim";
  return (
    <main className="bg-gray-100  dark:bg-slate-700 min-h-screen max-h-full">
      <Modal
        show={modal}
        position={"top-center"}
        size="lg"
        onClose={() => setModal(false)}
      >
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <div
            className={`flex flex-col gap-3 divide-gray-600 divide-y-2  ${
              teste.length > 5 ? "overflow-y-scroll" : "overflow-y-hidden teste"
            } ${teste.length > 5 ? "h-72" : "h-full"}`}
          >
            {teste.map((_, i) => (
              <div className="flex items-center gap-4">
                <div className="">
                  <p className="text-xs text-gray-400">{i + 1}</p>
                </div>
                <div className="dark:text-white text-xl">
                  <p>Tempero de alguma coisa aqui</p>
                  <p className="text-sm text-gray-400">
                    <span className="text-xs text-gray-400 ">
                      R$ 15,00 * 2 = R$ 30,00
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            d
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color={"failure"}>
            <AiFillCloseCircle size={30} />
          </Button>
          <Button color={"success"}>
            <AiFillCheckCircle size={30} />
          </Button>
        </Modal.Footer>
      </Modal>

      <header className="bg-white dark:bg-slate-800 sticky top-0">
        <div className="container mx-auto">
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
      </header>
      <section className="container mx-auto mt-2">
        <section className="dark:divide-gray-600 divide-y mx-5">
          <header className="flex items-center justify-between mt-3.5 mb-4">
            <h1 className="text-4xl dark:text-white text-gray-800">Vendas</h1>
            <div className="">
              <label
                htmlFor="default-search"
                className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="w-full">
                <input
                  type="search"
                  id="default-search"
                  className="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pesquise Produtos"
                />
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-4 select-none ">
            {loop.map((item, index) => (
              <div className="hover:shadow-2xl hover:transition-shadow">
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
                    <p
                      className="text-blue-600 cursor-pointer  hover:underline"
                      onClick={() => setModal(true)}
                    >
                      Ver Produtos
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Button color={"failure"}>
                      <AiFillCloseCircle size={30} />
                    </Button>
                    <Button color={"success"}>
                      <AiFillCheckCircle size={30} />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
