import useProduct from "../hooks/useProduct";
import { BsCardImage } from "react-icons/bs";
import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { updateProduct } from "../services/productServices";
//import { updateProduct } from "../services/productServices";

const ProductEdit = () => {
	const categories = useSelector((state: RootState) => state.category.value);
	const product = useProduct();
	//const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [content, setContent] = useState<any>([]);
	const [editMode, setEditMode] = useState<boolean>(false);
	/* const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]); */

	useEffect(() => {
		setContent(product);
		console.log(content);
		if (product?.images.length > 0 && !selectedImage) {
			setSelectedImage(product.images[0]);
		}
	}, [product, selectedImage]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleModes = (event: React.MouseEvent<HTMLButtonElement>) => {
		const buttonText = event.currentTarget.textContent;
		buttonText === "Edit" && setEditMode(true);
	};

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		setContent({
			...content,
			[name]: value,
		});
	};



	/* //? proban2
	const uploadImages = async (files: File[]): Promise<void> => {
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", "codeinfuse, medium, gist");
        formData.append("upload_preset", "facilmarket");
        formData.append("api_key", "711728988333761");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        );

        return res.data.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
		const updatedImages = [...images];
		updatedImages.splice(index, 1);
		setDeletedImages((prevDeletedImages) => [...prevDeletedImages, images[index]]);
		setImages(updatedImages);
	}; */



	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		//? set info
		const categoryFound = categories.find(
			(category) => category.id === Number(content.categoryID)
		);

		const categoryName = categoryFound
			? categoryFound.name
			: content.categoryName;

		content.categoryName = categoryName;

		updateProduct(content);

		setEditMode(false);
		console.log(content);
	};

	return (
		<div className="edit-detail-product-container">
			<form onSubmit={handleSubmit}>
				<div className="edit-detail-product">
					{editMode ? (
						<h1>Hola</h1>
					) : (
						<div className="edit-conteiner-pre-image">
							{product.images.map((img: string, index: number) => (
								<div
									key={index}
									className="edit-pre-image"
									onClick={() => handleImageClick(img)}
								>
									{img ? (
										<img
											className="edit-preview-image"
											src={img}
											alt="preview images"
										/>
									) : (
										<BsCardImage className="react-icon" />
									)}
								</div>
							))}
						</div>
					)}
					<div className="edit-detail-product-image">
						<img src={selectedImage} alt={product.name} />
					</div>
					<div className="edit-conteiner-info">
						<div className="edit-conteiner-name-price">
							<h1 className="edit-detail-product-name">
								{editMode ? (
									<input
										type="text"
										name="name"
										value={content.name}
										onChange={handleChange}
									/>
								) : (
									content.name
								)}
							</h1>

							<h1 className="edit-detail-product-price">
								{editMode ? (
									<input
										type="text"
										name="price"
										value={content.price}
										onChange={handleChange}
									/>
								) : (
									`$${content.price}`
								)}
							</h1>
						</div>

						<div className="edit-detail-product-info">
							<section className="edit-detail-product-section">
								<h2>Categoria:</h2>
								{editMode ? (
									<select
										name="categoryID"
										value={content.categoryID}
										onChange={handleChange}
									>
										{categories.map((category: any, index: number) => (
											<option key={index} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								) : (
									<h2>{content.categoryName}</h2>
								)}
							</section>

							<section className="edit-detail-product-section">
								<h2>Ubicación:</h2>
								<h3>
									{editMode ? (
										<input
											type="text"
											name="location"
											value={content.location}
											onChange={handleChange}
										/>
									) : (
										content.location
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Estado:</h2>
								<h3>
									{editMode ? (
										<select
											name="status"
											value={content.status}
											onChange={handleChange}
										>
											<option value="Nuevo">Nuevo</option>
											<option value="Usado">Usado</option>
										</select>
									) : (
										content.status
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Unidades:</h2>
								<h3>{content.stock}</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Cantidad:</h2>
								<h3>
									{editMode ? (
										<input
											type="text"
											name="unities"
											value={content.unities}
											onChange={handleChange}
										/>
									) : (
										content.unities
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<div className="edit-container-description">
									<h2>Descripción:</h2>
									{editMode ? (
										<textarea
											name="description"
											placeholder="Ingresa una descripción para tu producto"
											value={content.description}
											onChange={handleChange}
										/>
									) : (
										content.description
									)}
								</div>
							</section>
						</div>
					</div>
					<button
						className="edit-btn"
						onClick={handleModes}
						disabled={editMode}
					>
						Edit
					</button>
				</div>
				<button type="submit" disabled={!editMode}>
					Save
				</button>
			</form>
		</div>
	);
};

export default ProductEdit;
