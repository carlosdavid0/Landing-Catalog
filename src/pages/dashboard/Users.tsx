import { Avatar, Button, Modal, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/base/Header";
import Input, { AvatarInput } from "../../components/base/Input";
import Tables from "../../components/base/Tables";
import Notificacao from "../../components/Notification";
import { iUsuarios } from "../../interfaces/iUsuarios";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState<iUsuarios[]>([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('renderizou');
  

  useEffect(() => {
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function createUser(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    // transform avatar in file to send to api
    const avatar = data.get("avatar") as File;
    const avatarFile = new File([avatar], "avatar.png");

    data.append("avatar", avatarFile);
   
    api
      .post("/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((response) => {
        setLoading(false);

        setModal(false);
        Notificacao({
          message: "Usuário criado com sucesso!",
          type: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        Notificacao({ message: "Erro ao criar usuário!", type: "error" });
      });
  }
  return (
    <div className="dark:divide-gray-600 divide-y mx-5">
      <Header
        Page="Usuários"
        add={() => {
          setModal(true);
        }}
      />

      <Modal
        show={modal}
        position={"top-center"}
        size="xl"
        onClose={() => setModal(false)}
      >
        {/* <AvatarInput /> */}
        <Modal.Header>Criar Usuários</Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <form
                className="flex flex-col gap-10"
                onSubmit={(e) => {
                  createUser(e);
                }}
              >
                <div className="flex justify-center">
                  <AvatarInput name="avatar" />
                </div>
                <div className="grid grid-cols-2 gap-2 w-full  ">
                  <Input
                    label="Nome"
                    form="underline"
                    type="text"
                    name="name"
                  />

                  <Input
                    label="Email"
                    form="underline"
                    type="email"
                    name="email"
                  />
                  <Input
                    label="Senha"
                    form="underline"
                    type="password"
                    name="password"
                  />
                  <Input
                    label="Confirmar Senha"
                    form="underline"
                    type="password"
                    name="password_confirmation"
                  />
                </div>
                <div className="flex justify-center">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner
                        aria-label="Extra small spinner example"
                        size="lg"
                        color={"success"}
                      />
                    ) : (
                      "Criar"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Tables
        columns={[
          {
            key: "id",
            label: "ID",
            return({ i }: any) {
              if (i.avatar) {
                return <Avatar rounded img={i.avatar} size="sm" />;
              } else {
                var matches = i.name.match(/\b(\w)/g);
                var acronym = matches.join("");

                return <Avatar status="online" rounded size="sm" />;
              }
            },
          },
          {
            key: "1",
            label: "Nome",
            dataKey: "name",
          },
          {
            key: "2",
            label: "Email",
            dataKey: "email",
          },
          {
            key: "3",
            label: "Ações",
            return: (i: any) => (
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white  p-3 rounded-md">
                  Editar
                </button>
              </div>
            ),
          },
        ]}
        data={users}
      />
    </div>
  );
}
