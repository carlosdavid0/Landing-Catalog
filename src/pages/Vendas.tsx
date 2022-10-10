import axios from "axios";
import { Button, Card, Modal, Navbar } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Notificacao from "../components/Notification";
import { IVendas } from "../interfaces/iVendas";
import api from "../services/api";

export default function Vendas() {
  const [modal, setModal] = useState(false);
  const [vendas, setVendas] = useState<IVendas[]>();
  const [venda, setVenda] = useState<IVendas>();

  document.title = "Dashboard - SysAngelim";

  useEffect(() => {
    api.get("/vendas").then((response) => {
      setVendas(response.data);
    });

    document
      .querySelector("body")
      ?.classList.add(localStorage.getItem("theme") || "light");
  }, []);

  function getVenda(id: string) {
    setVenda(vendas?.find((venda) => venda.id === id));
    setModal(true);
  }

  function aproveVenda(id: string) {
    api
      .put(`/vendas/${id}`, {
        status: "aprovado",
      })
      .then((response) => {
        Notificacao({
          message: "Venda aprovada com sucesso!",
          type: "success",
        });
        setModal(false);
        setVenda(undefined);
        window.location.reload();
      })
      .catch((error) => {
        Notificacao({ message: "Erro ao aprovar venda!", type: "error" });
      });
  }

  function cancelVenda(id: string) {
    api
      .put(`/vendas/${id}`, {
        status: "rejeitado",
      })
      .then((response) => {
        Notificacao({
          message: "Venda cancelada com sucesso!",
          type: "success",
        });
        setModal(false);
        setVenda(undefined);
        window.location.reload();
      })
      .catch((error) => {
        Notificacao({ message: "Erro ao cancelar venda!", type: "error" });
      });
  }

  return (
    <main className="bg-gray-100  dark:bg-slate-700 min-h-screen max-h-full">
      <Modal
        show={modal}
        position={"top-center"}
        size="lg"
        onClose={() => {
          setModal(false);
          setVenda(undefined);
        }}
      >
        <Modal.Header>{"Detalhes do pedido"}</Modal.Header>
        <Modal.Body>
          <div
            className={`flex flex-col gap-3 divide-gray-600 divide-y-2  ${
              vendas?.length ? "overflow-y-scroll" : "overflow-y-hidden vendas"
            } `}
          >
            <div className="">
              <h1 className="text-gray-200 text-xl">
                <b>Cliente:</b> {venda?.nome_cliente}
              </h1>

              <div className="grid grid-cols-2 ">
                <h1 className="text-gray-200">
                  <b>Telefone</b>: {venda?.telefone}
                </h1>
                <h1 className="text-gray-200">
                  <b>Telefone</b>: {venda?.telefone}
                </h1>
              </div>
            </div>

            {venda?.produtos?.map((item, i) => (
              <div className="flex items-center gap-4">
                <div className="">
                  <p className="text-xs text-gray-400">{i + 1}</p>
                </div>
                <div className="dark:text-white text-xl">
                  <p>
                    {item.descricao[0] +
                      item.descricao.toLowerCase().substring(1)}
                  </p>
                  <p className="text-md text-gray-400">
                    <span className="text-xs text-gray-400 ">
                      {item.preco.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}{" "}
                      * {item.qtd} ={" "}
                      {(item.qtd * item.preco).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={"failure"}
            onClick={() => cancelVenda(venda?.id || "")}
          >
            <AiFillCloseCircle size={30} /> Rejeitar
          </Button>
          <Button
            color={"success"}
            onClick={() => aproveVenda(venda?.id || "")}
          >
            <AiFillCheckCircle size={30} />
            Aprovar
          </Button>
        </Modal.Footer>
      </Modal>

      <header className="bg-white dark:bg-slate-800 sticky top-0">
        <div className="container mx-auto">
          <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Comercial Angelim
              </span>
            </Navbar.Brand>
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
            {vendas?.map((item, index) => (
              <div className="hover:shadow-2xl hover:transition-shadow">
                <Card>
                  <header>
                    <p className="text-sm text-gray-400">Cliente:</p>
                    <h2 className="text-3xl font-semibold dark:text-white text-gray-900">
                      {item.nome_cliente}
                    </h2>
                  </header>

                  <div className="-mt-2 flex gap-4">
                    <p className="text-gray-500 text-sm">
                      {moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.forma_pagamento}
                    </p>
                    {item.status === "pendente" && (
                      <p className="animate-pulse text-yellow-400 text-sm">
                        {item.status}
                      </p>
                    )}
                    {item.status === "aprovado" && (
                      <p className="text-green-400 text-sm">{item.status}</p>
                    )}
                    {item.status === "rejeitado" && (
                      <p className=" text-red-400 text-sm">{item.status}</p>
                    )}
                  </div>

                  <div className="">
                    <div className="text-lg font-medium text-gray-300">
                    Total: {item.total.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    </div>
                    <p
                      className="text-blue-600 cursor-pointer  hover:underline"
                      onClick={() => getVenda(item.id || "")}
                    >
                      Ver Produtos
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Button
                      color={"failure"}
                      onClick={() => cancelVenda(item.id || "")}
                      disabled={item.status !== "pendente" ? true : false}
                    >
                      <AiFillCloseCircle size={30} />
                    </Button>
                    <Button
                      color={"success"}
                      onClick={() => aproveVenda(item.id || "")}
                      disabled={item.status !== "pendente" ? true : false}
                    >
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
