import { useEffect, useState } from "react";
import { getPurchasesByUser } from "../services/purchaseServices";
import { BuyProduct, Purchase } from "../utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { BsExclamationTriangle } from "react-icons/bs";

const ShoppingHistory = () => {
	const user = useSelector((state: RootState) => state.user.userLogin);
	const [purchases, setPurchases] = useState<Purchase[]>();
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await getPurchasesByUser(Number(user.user.id));
				console.log(response);

				setPurchases(response);
			} catch (error: any) {
				setError(error);
			}
		};
		fetchPurchases();
	}, [user]);

	const formatDate = (date: string) => {
		const fecha = new Date(date);
		// Nombres de los meses
		const months = [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		];
		// Obtiene el nombre del mes
		const day = String(fecha.getDate()).padStart(2, "0");
		const month = months[fecha.getMonth()];
		const year = fecha.getFullYear();
		const all = `${month} ${day} - ${year}`;
		return all;
	};

	const totalPrice = (products: Array<BuyProduct>) => {
		let price = 0;
		products.forEach((item) => {
			price += item.price * item.quantity;
		});
		return price;
	};

	return (
		<>
			<h1 className="shopping-title">Historial de compras</h1>

			<div className="shopping-container">
				{purchases?.length ? (
					<table className="shopping-table">
						<thead>
							<tr>
								<th className="shopping-th"># Pago</th>
								<th className="shopping-th">Fecha</th>
								<th className="shopping-th">Pagado</th>
								<th className="shopping-th">Resumen</th>
							</tr>
						</thead>
						<tbody>
							{purchases?.map((purchase, index) => (
								<tr key={index} className="shopping-tr">
									<td className="shopping-td">{purchase.paymentId}</td>
									<td className="shopping-td">
										{formatDate(purchase.createdAt)}
									</td>
									<td className="shopping-td">
										$
										{totalPrice(purchase.products).toLocaleString("es-AR", {
											minimumFractionDigits: 0,
										})}
									</td>
									<td className="shopping-td">
										<Link to={`/compra/${purchase.id}`}>Ver compra</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="no-purchases">
						<p>No has realizado ninguna compra todavía</p>
						<BsExclamationTriangle className="warning" />
						<Link to={"/products"}>
							<button>¡Comprar Ahora!</button>
						</Link>
					</div>
				)}
			</div>
			<p>{error}</p>
		</>
	);
};

export default ShoppingHistory;
