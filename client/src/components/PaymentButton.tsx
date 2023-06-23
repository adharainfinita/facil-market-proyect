import { Product } from "../utils/interfaces";
import { useState } from "react";
import { buyProduct } from "../services/productServices";

interface MercadoPagoButtonProps {
  product: Product;
}

const PaymentButton = ({ product }: MercadoPagoButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const generateLink = async () => {
    setLoading(true);
    try {
      const data = await buyProduct(product);

      window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {!loading ? (
        <button className="detail-product-btn" onClick={generateLink}>
          Comprar ahora!
        </button>
      ) : (
        <button className="detail-product-btn" disabled>
          ...
        </button>
      )}
    </div>
  );
};

export default PaymentButton;
