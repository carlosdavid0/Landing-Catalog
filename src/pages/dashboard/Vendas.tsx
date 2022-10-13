import axios from "axios";
import { Button, Card, Modal, Navbar } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Header from "../../components/base/Header";
import Notificacao from "../../components/Notification";
import { IVendas } from "../../interfaces/iVendas";
import api from "../../services/api";

export default function Vendas() {
  const [modal, setModal] = useState(false);
  const [vendas, setVendas] = useState<IVendas[]>();
  const [loading, setLoading] = useState(false);
  const [venda, setVenda] = useState<IVendas>();

  document.title = "Dashboard - SysAngelim";

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    });
    setLoading(true);
    api
      .get("/vendas")
      .then((response) => {
        setVendas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        Notificacao({ message: "Erro ao carregar as vendas", type: "error" });
        setLoading(false);
      });
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
    <main
      className="min-h-screen max-h-full"
      onKeyDown={(e) => {
        console.log(e);
      }}
    >
      <Modal
        show={modal}
        position={"top-center"}
        size="2xl"
        onClose={() => {
          setModal(false);
          setVenda(undefined);
        }}
      >
        <Modal.Header>{"Detalhes do pedido"}</Modal.Header>
        <Modal.Body>
          <div
            className={`flex flex-col gap-3 dark:divide-gray-600 divide-y-2 divide-gray-100  ${
              vendas?.length ? "overflow-y-scroll" : "overflow-y-hidden vendas"
            } `}
          >
            <div className="">
              <h1 className="dark:text-gray-200 text-xl">
                <b>Cliente:</b> {venda?.nome_cliente}
              </h1>

              <div className="grid grid-cols-3 ">
                <h1 className="dark:text-gray-200">
                  <b>Telefone</b>: {venda?.telefone}
                </h1>
                <h1 className="dark:text-gray-200">
                  <b>Pagamento em</b>: {venda?.forma_pagamento}
                </h1>
              </div>
            </div>

            {venda?.produtos?.map((item, i) => (
              <div className="flex items-center gap-4 p-2">
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
                      {` * `}
                      {item.qtd} =
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
            disabled={
              venda?.status === "aprovado" || venda?.status === "rejeitado"
            }
            color={"failure"}
            onClick={() => cancelVenda(venda?.id || "")}
          >
            <AiFillCloseCircle size={30} /> Rejeitar
          </Button>
          <Button
            disabled={
              venda?.status === "aprovado" || venda?.status === "rejeitado"
            }
            color={"success"}
            onClick={() => aproveVenda(venda?.id || "")}
          >
            <AiFillCheckCircle size={30} />
            Aprovar
          </Button>
        </Modal.Footer>
      </Modal>

      <section className="dark:divide-gray-600 divide-y mx-5">
        <Header
          Page="Vendas"
          render={
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
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4 select-none ">
          {vendas?.map((item, index) => (
            <div
              className="hover:shadow-2xl hover:transition-shadow"
              key={index}
            >
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
                    <p className=" dark:text-red-400 text-red-600 font-bold text-sm">
                      {item.status}
                    </p>
                  )}
                </div>

                <div className="">
                  <div className="text-lg font-medium dark:text-gray-300">
                    Total:
                    {item.total.toLocaleString("pt-br", {
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

          {vendas?.length === 0 && (
            <div className="flex">
              <p className="text-2xl text-gray-400">Nenhuma venda encontrada</p>
            </div>
          )}
          {loading && (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
