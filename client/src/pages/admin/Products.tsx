import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Products() {
	const products = useSelector((state: RootState) => state.product.products);

	return (
		<table className="user-table">
			<thead>
				<tr>
					<th className="user-table-th">ID</th>
					<th className="user-table-th">Imagen</th>
					<th className="user-table-th">Nombre</th>
					<th className="user-table-th">Precio</th>
					<th className="user-table-th">Stock</th>
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
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Products;
