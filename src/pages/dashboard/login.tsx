import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Notificacao from "../../components/Notification";
import api from "../../services/api";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    function auth(){
        setLoading(true);
        api.post('/login', {email, password}).then((response) => {
            api.defaults.headers.common['authorization'] = `${response.data.token}`;
            localStorage.setItem('token', response.data.token);
            Notificacao({message: 'Login efetuado com sucesso!', type: 'success'});
            setLoading(false);
        }).catch((error) => {
            
            Notificacao({message:error.response.data.message ,type: 'error'});
            setLoading(false);
        })


        
    }
  return (
    <main className="bg-slate-900 h-screen">
      <div className="flex items-center justify-center min-h-full flex-col gap-2">
        <div className="mb-5">
          <h1 className="text-2xl text-gray-100">Comercial Angelim</h1>
        </div>
        <form className="flex flex-col gap-3 w-3/12 ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="rounded-md p-2"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="rounded-md p-2"
            required
          />
          <div className="flex w-full justify-center">
            <button onClick={auth} type="button" className="bg-[#6900ea] w-full p-2 rounded-md text-gray-50 hover:bg-purple-700 transition-all duration-200 ease-in-out disabled:bg-[#6900ea83] disabled:cursor-not-allowed " disabled={email ==='' || password ==='' || loading?true:false}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-50 text-white"></div>
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
