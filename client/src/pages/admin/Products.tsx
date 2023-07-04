import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteProduct } from "../../services/productServices";

function Products() {
	const products = useSelector((state: RootState) => state.product.products);
	const [active, setActive] = useState<boolean>(true);

	const disabledProduct = async (productID: number) => {
		const disabled = await deleteProduct(productID);
		console.log(disabled);

		setActive(!active);
	};

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
				{products.map((product) => (
					<tr key={product.id}>
						<td className="user-table-td">{product.id}</td>
						<td className="user-table-td">
							<img width={50} src={product.images[0]} alt={product.name} />
						</td>
						<td className="user-table-td">{product.name}</td>
						<td className="user-table-td">${product.price}</td>
						<td className="user-table-td">{product.unities}</td>
						<td className="user-table-td">
							<button onClick={() => disabledProduct(product.id)}>
								{active ? "Desactivar" : "Activar"}
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Products;
