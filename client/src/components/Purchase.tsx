import { useEffect, useState } from "react";
import { getPurchasesById } from "../services/purchaseServices";
import { BuyProduct, Purchase } from "../utils/interfaces";
import { Link, useParams } from "react-router-dom";


const Purchase = () => {
    const {id} = useParams()
	const [purchase, setPurchase] = useState<Purchase>();
	const [error, setError] = useState("");

	/* const response = window.localStorage.getItem("carts")
	const orderQuantity = JSON.parse(response || "");
	console.log(orderQuantity) */

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await getPurchasesById(Number(id));
				setPurchase(response);
			} catch (error: any) {
				setError(error);
			}
		};
		fetchPurchases();
	}, [id]);

	const formatDate = (date: string) => {
		const fecha = new Date(date);

		// Nombres de los meses
		const months = [
			"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		];

		// Obtiene el nombre del mes
        const day = String(fecha.getDate()).padStart(2, '0');
		const month = months[fecha.getMonth()];
        const year = fecha.getFullYear();
        const all = `${month} ${day} - ${year}`

		// Obtiene la hora en formato HH:mm:ss
		const hours = String(fecha.getHours()).padStart(2, '0');
		const minutes = String(fecha.getMinutes()).padStart(2, '0');
		const time = `${hours}:${minutes}`;

		return `${all} Hora: ${time}`;
	};

	const totalPrice = (products: Array<BuyProduct>) => {
		let price = 0
		products?.forEach(item => {
			price += item.price * item.quantity
		});
		return price
	}

	return (
		<>
			{purchase ? 
            (	
				<>
                <h1 className="shopping-title">Compra: #{purchase.paymentId}</h1>
                <div className="purchase-container">
                    <div className="purchase-information">
						<h3>Información de la compra:</h3>
						<h5>Fecha: {formatDate(purchase.createdAt)}</h5>
						<h5>Total pagado: ${totalPrice(purchase.products)
							.toLocaleString("es-AR", {
							minimumFractionDigits: 0,
						})}</h5>
					</div>

                    <div className="purchase-products">
                        <h3>Resumen de productos</h3>
                        {purchase.products.map((product) =>(
                            <Link to={`/product/detail/${product.id}`}>
                                <div key={product.id} className="purchase-product">
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>Precio: ${product.price.toLocaleString("es-AR", {
                                        minimumFractionDigits: 0,
                                    })}</p>
                                    <p>Unidades: {product.quantity}</p>
                                    <p className="purchase-total-product">Total: 
									${(product.price * product.quantity).toLocaleString("es-AR", {
										minimumFractionDigits: 0,
									})}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="purchase-total">Total Pagado: ${totalPrice(purchase.products)
                        .toLocaleString("es-AR", {
						minimumFractionDigits: 0,
					})}</div>
                </div>
				</>
            )
            : (<h1>No se encontró esta compra</h1>)}
			<p>{error}</p>
		</>
	);
};

export default Purchase;
