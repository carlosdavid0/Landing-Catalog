import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Header from "../../../components/base/Header";
import Tables from "../../../components/base/Tables";
import Notificacao from "../../../components/Notification";
import { produto } from "../../../interfaces/Iprodutos";
import api from "../../../services/api";

export default function Produtos() {
  const [produto, setProdutos] = useState<produto[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    api
      .get("/produtos")
      .then((response) => {
        setloading(false);
        setProdutos(response.data);
      })
      .catch((err) => {
        setloading(false);
        Notificacao({ message: "Erro ao buscar os produtos", type: "error" });
      });
  }, []);

  function changeStatus(id: number) {
    api
      .put(`/produto/status/${id}`,{
        status: produto.find((i) => i.id === id)?.ativo === true? false: true
      })
      .then((response) => {
        Notificacao({ message: "Status alterado com sucesso", type: "success" });
        const newProdutos = produto.map((item) => {
          if (item.id === id) {
            item.ativo = !item.ativo;
          }
          return item;
        }
        );
        setProdutos(newProdutos);
      })
      .catch((err) => {
        Notificacao({ message: "Erro ao alterar o status", type: "error" });
        setloading(false);
      });
  }

  return (
    <div className="dark:divide-gray-600 divide-y mx-5">
      <Header Page="Produtos" />

      <Tables
        isLoading={loading}
        columns={[
          {
            key: "1",
            label: "#",
            dataKey: "codigo",
          },
          {
            key: "2",
            label: "Produto",
            dataKey: "nome",
          },
          {
            label: "Categoria",
            dataKey: "categoria",
          },
          {
            label: "Preço de custo",
            return({ i }: any) {
              return i.custo.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });
            },
          },
          {
            label: "Preço de venda",
            return({ i }: any) {
              return `${i.venda.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })} ${i.embalagem}`;
            },
          },
          {
            label: "Estoque",
            dataKey: "estoque",
          },
          {
            label: "Status",
            return({ i }: any) {
              return (
                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    defaultChecked={i.ativo}
                    onChange={() => changeStatus(i.id)}
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              );
            },
          },
        ]}
        data={produto}
      />
    </div>
  );
}
