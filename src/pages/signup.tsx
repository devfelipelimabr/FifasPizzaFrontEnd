import { useState, FormEvent, useContext } from "react";
import Head from "next/head";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContex } from "@/contexts/AuthContext";

import Link from "next/link";

import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContex);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!name || !password || !email) {
      return toast.warning("Preencha todos os campos");
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);
  }

  return (
    <>
      <Head>
        <title>Fifas Pizza - Cadastro</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo fifas pizzaria" priority={true} />
        <div className="login">
          <h1>criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Nome"
              type="text"
              id="nome"
              name="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nome"
            />
            <Input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="senha"
            />

            <Button type="submit" loading={loading}>
              cadastrar
            </Button>
          </form>
          <Link className="text" href="/">
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  );
}
