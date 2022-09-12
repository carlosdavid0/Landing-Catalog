import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Navbar,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { produto } from "./interfaces/Iprodutos";
import { ICard } from "./interfaces/Icard";

function App() {
  const [themes, setThemes] = useState("light");
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const [card, setCard] = useState<ICard[]>();
  const [totalCard, setTotalCard] = useState(0);

  const [produtos, setProdutos] = useState<produto[]>();
  const [produtoSearch, setProdutoSearch] = useState<produto[]>();
  const [qtdProdutos, setQtdProdutos] = useState(1);
  const [produto, setProduto] = useState<produto>();

  useEffect(() => {
    const count = JSON.parse(localStorage.getItem("produtos") || "[]").length;
    setCount(count);
    setLoading(true);
    axios
      .get("http://localhost:6060/produtos")
      .then((response) => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setProduto(undefined);
        setLoading(false);
        console.log(error);
      });
  }, []);

  function handleCard() {
    const card = JSON.parse(localStorage.getItem("produtos") || "[]");

    setTotalCard(0);
    card.map((item: any) => {
      setTotalCard((totalCard) => totalCard + item.preco * item.qtd);
    });

    setCard(card);
    setModalCard(true);
  }

  function getProdutoToAdd(cod_produto: string) {
    const prod = produtos?.find((produto) => produto.codigo === cod_produto);
    setProduto(prod);
    setModal(true);
  }

  function onkeonkeydown(e: any) {
    if (e.key === "Escape") {
      onClose();
    }

    if (
      e.key === "." ||
      e.key === "," ||
      e.key === "-" ||
      e.key === "+" ||
      e.key === "e" ||
      e.key === "E" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      e.preventDefault();
    }
  }

  function addProdutoToLocalstorageAsArray(produto: produto) {
    const prod = {
      codigo: produto?.codigo,
      descricao: produto?.nome,
      preco: produto?.venda,
      qtd: qtdProdutos,
    };

    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

    produtos.push(prod);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    const count = JSON.parse(localStorage.getItem("produtos") || "[]").length;
    setCount(count);
    onClose();
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

  function onClose() {
    setModal(false);
    setProduto(undefined);
    setQtdProdutos(1);
  }

  function onCloseCard() {
    setModalCard(false);
  }

  function theme(e: boolean) {
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

  function search(e: string) {
    const prod = produtos?.filter((produto) =>
      produto.nome.toLowerCase().trim().includes(e.toLowerCase())
    );
    setProdutoSearch(prod);
  }

  function removeFromCard(cod_produto: string) {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

    const prod = produtos.filter(
      (produto: any) => produto.codigo !== cod_produto
    );

    localStorage.setItem("produtos", JSON.stringify(prod));

    const count = JSON.parse(localStorage.getItem("produtos") || "[]").length;
    setCount(count);
    handleCard();
  }

  return (
    <div onKeyDown={onkeonkeydown} className="min-h-screen max-h-full">
      {loading ? (
        <div className="h-screen bg-gray-100 dark:bg-slate-700">
          <div className="">
            <div className="sticky top-0">
              <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="">
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Comercial Angelim
                  </span>
                </Navbar.Brand>
                <div className="flex md:order-2 gap-2 items-center">
                  <label
                    htmlFor="default-toggle"
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      onChange={(e) => {
                        theme(e.target.checked);
                      }}
                      type="checkbox"
                      checked={themes === "dark" ? true : false}
                      value=""
                      id="default-toggle"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>

                  <Button label={count}>
                    <AiOutlineShoppingCart size={20} />
                  </Button>
                </div>
              </Navbar>
            </div>

            <div role="status" className="flex justify-center m-auto mt-5">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-gray-300 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            produtoSearch?.length ? "h-full" : "h-screen"
          } bg-gray-100 dark:bg-slate-700`}
        >
          <div className="h-full ">
            {modalCard && card ? (
              <Modal
                show={modalCard}
                onClose={onCloseCard}
                position="top-center"
              >
                <Modal.Header>Carrinho de compras</Modal.Header>
                <Modal.Body>
                  <div className=" flex flex-col gap-3 ">
                    {card.length >= 1 ? (
                      card?.map((item, index: number) => (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="">
                              <p className="text-xs text-gray-400">
                                {index + 1}
                              </p>
                            </div>
                            <div className="dark:text-white text-xl">
                              <p>
                                {item.descricao[0] +
                                  item.descricao.toLowerCase().substring(1)}
                              </p>
                              <p className="text-sm text-gray-400">
                                <span className="text-xs text-gray-400 ">
                                  {`${item?.preco?.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                  })} x ${item?.qtd} = ${(
                                    item.preco * item.qtd
                                  ).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}`}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="">
                            <Button
                              color={"failure"}
                              onClick={() => removeFromCard(item.codigo)}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col dark:text-white items-center justify-center gap-2">
                        <div className="flex items-center justify-center dark:text-gray-400 text-gray-600">
                          <AiOutlineShoppingCart size={50} />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-xl font-medium">Carrinho vazio</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                      <p className="dark:text-gray-400 text-sm">Total</p>
                      <p className="text-2xl font-bold dark: dark:text-gray-100">
                        {totalCard.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                    <Button
                      color={"success"}
                      disabled={card.length === 0 ? true : false}
                    >
                      Finalizar
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            ) : null}

            {modal && produto ? (
              <Modal show={modal} onClose={onClose} size="lg" position={'top-center'}>
                <Modal.Header>
                  <p className="text-gray-600 dark:text-gray-300">
                    Adicionar Produto
                  </p>
                </Modal.Header>
                <Modal.Body>
                  <div className="">
                    <div className="">
                      <p className="text-2xl dark:text-white text-slate-800 font-bold">
                        {produto.nome[0].toUpperCase() +
                          produto.nome.substring(1).toLowerCase()}
                      </p>
                      <p className="text-2xl dark:text-gray-300">
                        {produto.venda.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                        <span className="text-sm m-2">
                          {produto.embalagem[0] +
                            produto.embalagem.substring(1).toLowerCase()}
                        </span>
                      </p>
                    </div>

                    <div className="mt-2">
                      <Label>Quantidade:</Label>
                      <TextInput
                        type="number"
                        min={1}
                        defaultValue={1}
                        onKeyDown={onkeonkeydown}
                        onChange={(e) => setQtdProdutos(Number(e.target.value))}
                      />
                    </div>

                    <div className="border-t-2 border-opacity-5 border-gray-50 mt-2">
                      <p className="text-gray-400 text-sm mt-3"> Valor Total</p>
                      <p className="text-2xl dark:text-gray-300">
                        {(produto.venda * qtdProdutos).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => {
                      addProdutoToLocalstorageAsArray(produto);
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                  <Button
                    color={"failure"}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancelar
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : null}

<div className="sticky top-0 z-50">
              <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="/">
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Comercial Angelim
                  </span>
                </Navbar.Brand>
                <div className="flex md:order-2 gap-2 items-center">
                  <label
                    htmlFor="default-toggle"
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      onChange={(e) => {
                        theme(e.target.checked);
                      }}
                      type="checkbox"
                      checked={themes === "dark" ? true : false}
                      value=""
                      id="default-toggle"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>

                  <Button label={count} onClick={handleCard}>
                    <AiOutlineShoppingCart size={20} />
                  </Button>
                </div>
              </Navbar>
            </div>

            <div className="relative py-2 px-6 my-2">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="">
                <input
                  onChange={(e) => search(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pesquise Produtos"
                />
              </div>
            </div>

            <div className="relative grid py-2 bg-gray-100 dark:bg-slate-700 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-6 my-2">
              {produtoSearch
                ? produtoSearch.map((produto) => (
                    <div className="" key={produto.codigo}>
                      <Card imgAlt={produto.nome.toLowerCase()}>
                        <p className=" dark:text-white text-lg text-slate-800 font-semibold">
                          {produto.nome[0].toUpperCase() +
                            produto.nome.substring(1).toLowerCase()}
                        </p>

                        <div className="flex items-center justify-between gap-10">
                          <span className="text-2xl max-w-xl font-bold text-gray-900 dark:text-gray-300">
                            {produto.venda.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            <span className="text-sm m-2">
                              {produto.embalagem[0] +
                                produto.embalagem.substring(1).toLowerCase()}
                            </span>
                          </span>
                          {produto.estoque > 0 ? (
                            <Button
                              onClick={() => getProdutoToAdd(produto.codigo)}
                            >
                              Comprar
                            </Button>
                          ) : (
                            <Button
                              color={"failure"}
                              onClick={() => getProdutoToAdd(produto.codigo)}
                            >
                              Comprar
                            </Button>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))
                : produtos?.map((produto) => (
                    <div className="" key={produto.codigo}>
                      <Card imgAlt={produto.nome.toLowerCase()}>
                        <p className=" dark:text-white text-lg text-slate-800 font-semibold">
                          {produto.nome[0].toUpperCase() +
                            produto.nome.substring(1).toLowerCase()}
                        </p>

                        <div className="flex items-center justify-between gap-10">
                          <span className="text-2xl max-w-xl font-bold text-gray-900 dark:text-gray-300">
                            {produto.venda.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            <span className="text-sm m-2">
                              {produto.embalagem[0] +
                                produto.embalagem.substring(1).toLowerCase()}
                            </span>
                          </span>
                          {produto.estoque > 0 ? (
                            <Button
                              onClick={() => getProdutoToAdd(produto.codigo)}
                            >
                              Comprar
                            </Button>
                          ) : (
                            <Button
                              color={"failure"}
                              style={{ cursor: "not-allowed" }}
                            >
                              Esgotado
                            </Button>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
