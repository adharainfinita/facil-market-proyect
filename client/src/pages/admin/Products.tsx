import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteProduct } from "../../services/productServices";
import { Product } from "../../utils/interfaces";
import { toast } from "react-toastify";

function Products() {
  const products = useSelector((state: RootState) => state.product.products);
  const [updatedProducts, setUpdatedProducts] = useState<Product[]>([]);

  const disabledProduct = async (product: Product) => {
    const disabled = await deleteProduct(product.id);
    const updatedProductsList = updatedProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, active: disabled.prod.active };
      }
      return p;
    });
    if(product.active) {
      toast.warning("Producto desactivado", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else {
      toast.success("Producto activado", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setUpdatedProducts(updatedProductsList);
  };

  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th className="user-table-th">ID</th>
          <th className="user-table-th">Imagen</th>
          <th className="user-table-th">Nombre</th>
          <th className="user-table-th">Precio</th>
          <th className="user-table-th">Stock</th>
          <th className="user-table-th">Acción</th>
        </tr>
      </thead>
      <tbody>
        {updatedProducts.map((product) => (
          <tr key={product.id}>
            <td className="user-table-td">{product.id}</td>
            <td className="user-table-td">
              <img width={50} src={product.images[0]} alt={product.name} />
            </td>
            <td className="user-table-td">{product.name}</td>
            <td className="user-table-td">${product.price}</td>
            <td className="user-table-td">{product.unities}</td>
            <td className="user-table-td">
              {product.active ? (
                <button className="user-table-disableBtn" onClick={() => disabledProduct(product)}>
                  Desactivar
                </button>
              ) : (
                <button className="user-table-activeBtn" onClick={() => disabledProduct(product)}>
                  Activar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Products;
