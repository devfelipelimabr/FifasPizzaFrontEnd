import Head from "next/head";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fifas Pizza - Login</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo fifas pizzaria" />
        <div className="login">
          <form>
            <Input placeholder="Email" type="text" />
            <Input placeholder="Senha" type="password" />

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
