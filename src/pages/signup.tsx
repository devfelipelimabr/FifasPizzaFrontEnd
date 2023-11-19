import Head from "next/head";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Fifas Pizza - Cadastro</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo fifas pizzaria" />
        <div className="login">
          <h1>criando sua conta</h1>
          <form>
            <Input placeholder="Nome" type="text" />
            <Input placeholder="Email" type="text" />
            <Input placeholder="Senha" type="password" />

            <Button type="submit" loading={false}>
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
