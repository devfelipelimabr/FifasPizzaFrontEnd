import { useContext, useState, FormEvent } from "react";

import Head from "next/head";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContex } from "@/contexts/AuthContext";

import Link from "next/link";

export default function Home() {
  const { signIn } = useContext(AuthContex);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Fifas Pizza - Login</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo fifas pizzaria" />
        <div className="login">
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button type="submit" loading={false}>
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
