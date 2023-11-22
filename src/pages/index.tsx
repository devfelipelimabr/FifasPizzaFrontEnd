import { useContext, useState, FormEvent } from "react";

import Head from "next/head";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContex } from "@/contexts/AuthContext";

import Link from "next/link";

import { canSSRGuest } from "@/utils/canSSRGuest";

import { toast } from "react-toastify";

export default function Home() {
  const { signIn } = useContext(AuthContex);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      return toast.warning("Preencha todos os campos");
    }

    setloading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setloading(false);
  }

  return (
    <>
      <Head>
        <title>Fifas Pizza - Login</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo fifas pizzaria" priority={true} />
        <div className="login">
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link className="text" href="/signup">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});