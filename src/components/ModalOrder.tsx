import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

import { OrderDetailItemProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onReqClose: () => void;
  order: OrderDetailItemProps[];
  finishOrder: (id: string)=> void
  loading: boolean
}

export function ModalOrder({ isOpen, onReqClose, order, finishOrder, loading }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "2rem",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onReqClose} style={customStyles}>
      <Button type="button" onClick={onReqClose} className="react-modal-close">
        <FiX size={45} />
      </Button>
      <div className="modalContainer">
        <h2>detalhes do pedido</h2>
        <h3>Mesa: {order[0].order.table}</h3>
        {order.map((item) => (
          <section key={item.id} className="containerItem">
            <span>
              {item.amount} - <strong>{item.product.name}</strong>
            </span>
            <span className="description">{item.product.description}</span>
          </section>
        ))}

        <Button onClick={()=>finishOrder(order[0].order_id)} loading={loading}>
                concluir pedido
        </Button>
      </div>
    </Modal>
  );
}
