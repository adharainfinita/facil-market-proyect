import { BuyProduct } from "../utils/interfaces";
import { useState } from "react";
import { buyProduct } from "../services/productServices";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";

const PaymentButton = (product: Array<BuyProduct>) => {
	const userID = useSelector((state: RootState)=> state.user.userLogin.user.id)
	const [loading, setLoading] = useState<boolean>(false);

	const generateLink = async () => {
		setLoading(true);
		try {
			const data = await buyProduct(product, Number(userID));

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
