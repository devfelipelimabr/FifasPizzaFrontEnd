import { useState, FormEvent } from "react";
import { setupAPIClient } from "@/services/api";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { toast } from "react-toastify";

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCategorySubmit(event: FormEvent) {
    event.preventDefault();

    if (!categoryName) {
      return toast.warning("Preencha o campo");
    }

    setLoading(true);

    const categoryData = {
      name: categoryName,
    };

    const apiClient = setupAPIClient();

    try {
      await apiClient.post("/categories", categoryData);
      toast.success(`Categoria cadastrada com sucesso`);
      setCategoryName("");
    } catch (error) {
      toast.error(`Erro ao cadastrar categoria: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro de Categoria - Fifas Pizza</title>
      </Head>
      <div>
        <Header />
        <main className="container">
          <h1>Cadastrar Categorias</h1>
          <form className="form" onSubmit={handleCategorySubmit}>
            <Input
              type="text"
              className="input"
              name="category"
              id="category"
              placeholder="Digite o nome da categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
