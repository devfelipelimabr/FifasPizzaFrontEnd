import { useState, FormEvent, ChangeEvent } from "react";
import { setupAPIClient } from "@/services/api";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

type ItemProps = [
  {
    id: string;
    name: string;
  }
];

interface CategoryProps {
  categories: ItemProps;
}

export default function Product({ categories }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File | undefined>(undefined);
  const [categorieList, setCategorieList] = useState(categories || []);
  const [categorySelected, setCategorySelected] = useState(-1);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (
      image.type === "image/png" ||
      image.type === "image/jpeg" ||
      image.type === "image/jpg"
    ) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  async function handleProductSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !productName ||
      !imageAvatar ||
      !categorieList ||
      !description ||
      !price ||
      categorySelected == -1
    ) {
      return toast.warning("Preencha todos os campos");
    }

    setLoading(true);

    const productData = new FormData();

    productData.append("name", productName);
    productData.append("price", price);
    productData.append("description", description);
    productData.append("category_id", categorieList[categorySelected].id);
    productData.append("file", imageAvatar);

    const apiClient = setupAPIClient();

    try {
      await apiClient.post("/products", productData);
      toast.success(`Produto cadastrado com sucesso`);
      setProductName("");
      setImageAvatar(undefined);
      setAvatarUrl("");
      setCategorieList(categories || []);
      setDescription("");
      setPrice("");
      setCategorySelected(-1);
    } catch (error) {
      toast.error(`Erro ao cadastrar produto: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro de Produto - Fifas Pizza</title>
      </Head>
      <div>
        <Header />
        <main className="container">
          <h1>Cadastrar Produtos</h1>
          <form className="form" onSubmit={handleProductSubmit}>
            <label className="labelAvatar">
              <span>
                <FiUpload size={35} />
              </span>
              <Input
                className="input"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFile}
              />

              {avatarUrl ? (
                <Image
                  className="preview"
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              ) : null}
            </label>

            <select
              className="input"
              name="categoryName"
              id="categoryName"
              value={categorySelected}
              onChange={(e) => setCategorySelected(parseInt(e.target.value))}
            >
              <option value="-1">Selecione uma categoria</option>
              {categories.map((cat, index) => {
                return (
                  <option key={cat.id} value={index}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <Input
              type="text"
              className="input"
              name="name"
              id="name"
              placeholder="Digite o nome do produto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <Input
              type="number"
              className="input"
              name="price"
              id="price"
              placeholder=" Digite o preço 0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              className="input"
              name="description"
              id="description"
              placeholder="Descreva o produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
  const apiClient = setupAPIClient(ctx);

  const res = await apiClient.get("/categories");

  return {
    props: {
      categories: res.data,
    },
  };
});
