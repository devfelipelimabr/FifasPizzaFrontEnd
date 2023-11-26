import { useState } from "react";
import { setupAPIClient } from "@/services/api";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { toast } from "react-toastify";
import { FiRefreshCcw } from "react-icons/fi";
import Modal from "react-modal";
import { ModalOrder } from "@/components/ModalOrder";

type OrderItemProps = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name: null | string;
  created_at: string;
  updated_at: string;
};

interface OrderProps {
  orders: OrderItemProps[];
}

export type OrderDetailItemProps = {
  id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
  };
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: null | string;
    created_at: string;
    updated_at: string;
  };
};

export default function Dashboard({ orders }: OrderProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderDetailItemProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleOpenModalView(order_id: string) {
    const apiClient = setupAPIClient();

    const res = await apiClient.get("/orders/datail", {
      params: {
        order_id,
      },
    });

    setModalItem(res.data);
    setModalVisible(true);
  }

  function handleCloseModalView() {
    setModalVisible(false);
  }

  async function handleFinishOrder(id: string) {
    setLoading(true);
    const apiClient = setupAPIClient();

    try {
      await apiClient.patch("/orders/status", {
        order_id: id,
      });

      const res = await apiClient.get("/orders");

      setOrderList(res.data);

      toast.success(`Pedido finalizado com sucesso!`);
    } catch (error) {
      toast.error(`Erro ao finalizar pedido: ${(error as Error).message}`);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  }

  async function handleRefreshOrders() {
    setLoading(true)
    const apiClient = setupAPIClient();

    const res = await apiClient.get("/orders");

    setOrderList(res.data);
    setLoading(false)
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Fifas Pizza</title>
      </Head>
      <div>
        <Header />
        <main className="container">
          <div className="containerHeader">
            <h1>últimos pedidos</h1>
            <Button onClick={handleRefreshOrders} loading={loading}>
              <FiRefreshCcw size={25} />
            </Button>
          </div>

          <article className="listOrders">
            {orderList.length === 0 ? (
              <span className="noList">Nenhum pedido foi encontrado</span>
            ) : null}
            {orderList.map((item) => (
              <section key={item.id} className="orderItem">
                <Button onClick={() => handleOpenModalView(item.id)}>
                  <div className="tag"> </div>
                  mesa {item.table}
                </Button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible ? (
          <ModalOrder
            isOpen={modalVisible}
            onReqClose={handleCloseModalView}
            order={modalItem}
            finishOrder={handleFinishOrder}
            loading={loading}
          />
        ) : null}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const res = await apiClient.get("/orders");

  return {
    props: {
      orders: res.data,
    },
  };
});
