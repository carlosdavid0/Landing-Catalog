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
  const [loadingRequest, setloadingRequest] = useState(false);


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
    setloadingRequest(true);
    api
      .put(`/produto/status/${id}`, {
        status: produto.find((i) => i.id === id)?.ativo === true ? false : true
      })
      .then((response) => {
        setloadingRequest(false);
        const prodMod = produto.find((i) => i.id === id);
        Notificacao({ message: ` ${prodMod?.nome} alterado com sucesso`, type: "success" });
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
        setloadingRequest(false);
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
                <div className="flex items-center justify-center">
                  <Button
                    disabled={loadingRequest}
                    onClick={() => changeStatus(i.id)}
                    color={i.ativo ? "success" : "failure"}
                  >

                    {i.ativo ? "Ativo" : "Inativo"}

                    {loadingRequest && (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white ml-3"></div>
                    )}
                  </Button>
                </div>
              );

            }
          }
        ]}
        data={produto}
      />
    </div>
  );
}
