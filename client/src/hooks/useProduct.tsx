import { getDetail, cleanDetail } from "../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsById } from "../services/productServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector((state: RootState) => state.product.detail);

	useEffect(() => {
		try {
			getProductsById(Number(id)).then((data) => dispatch(getDetail(data)));
		} catch (error) {
			console.log(error);
		}
		return () => {
			dispatch(
				cleanDetail({
					id: 0,
					name: "",
					description: "",
					stock: "",
					rating: 0.0,
					images: [""],
					location: "",
					price: 0.0,
					categoryID: 0,
					categoryName: "",
					userID: "",
					userName: "",
					unities: 0,
					status: "",
					active: true,
				})
			);
		};
	}, [dispatch, id]);

	return product;
};

export default useProduct;
