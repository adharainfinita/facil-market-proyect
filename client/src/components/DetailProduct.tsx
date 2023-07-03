import { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Product } from "../utils/interfaces";
import useProduct from "../hooks/useProduct";
import { updateItem } from "../services/cartServicer";
import { useSelector, useDispatch } from "react-redux";
import Reviews from "./Review";
import { BuyProduct, NotificationType } from "../utils/interfaces";

import { postUserPurchase } from "../services/purchaseServices";
//import { updateUnities } from "../redux/features/productSlice";
//import { updateStock } from "../services/productServices";
import { addToCart } from "../redux/features/cartSlice";


const DetailProduct = () => {
  const product = useProduct();
  const currentUser = useSelector((state: RootState) => state.user.userLogin)
  //const dispatch = useDispatch()

  const [isReadyToPost, setIsReadyToPost] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const userLoginId = useSelector(
    (state: RootState) => state.user.userLogin.user.id
  );
  const [error, setError] = useState<string>('');
  const [stock, setStock] = useState<number>(1);

 
  const [notification, setNotification] = useState<NotificationType>({
    isOpen: false,
    type: null,
    content: "",
  });

  const dispatch = useDispatch();

  const handleAddToCart = async(userID:number ,product: Product) => {
    dispatch(addToCart(product.id));
    await updateItem(userID, product)
  };

  useEffect(() => {
    if (product?.images.length > 0 && !selectedImage) {
      setSelectedImage(product.images[0]);
    }
  }, [product, selectedImage]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const status = urlParams.get("status");
  const handleStockChange = (action: string) => {
    if(action === 'increment'){
      setStock(stock + 1)
    } else{
      setStock(stock - 1)
    }
  }

  const data: BuyProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    quantity: stock
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

  //   if (status === "approved") {
  //     setNotification({
  //       content: "Pago aprobado😎",
  //       isOpen: true,
  //       type: "approved",
  //     });
  //   }

  //   if (status === "failure") {
  //     setNotification({
  //       content: "Pago rechazado😢",
  //       isOpen: true,
  //       type: "failure",
  //     });
  //   }
  // }, []);
    if (status === "approved" && currentUser && product.id !== 0) {
      setIsReadyToPost(true);
    }
    if (status === "null") {
      setNotification({
        content: "Pago rechazado😢",
        isOpen: true,
        type: "failure",
      })};
  }, [currentUser, product]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("payment_id");
    if (isReadyToPost) {
      setNotification({
        content: "Pago aprobado😎",
        isOpen: true,
        type: "approved",
      });

      const postPurchase = async () => {
        try {
          const info = {
            userId: Number(currentUser.user.id),
            productId: product.id,
            paymentId: Number(paymentId)
          };
          if (info.userId !== 0 && info.productId !== 0) {
            const responsePurchase = await postUserPurchase(info);
            return responsePurchase;
          }
        } catch (error: any) {
          setError(error);
        }
      };
      postPurchase();      
    }
  }, [isReadyToPost]);

  return (
    <div className="detail-product-container">
      <div className="detail-product">
        <div className="conteiner-pre-image">
          {product.images.map((img: string, index: number) => (
            <div
              key={index}
              className="pre-image"
              onClick={() => handleImageClick(img)}
            >
              {img ? (
                <img className="preview-image" src={img} alt="preview images" />
              ) : (
                <BsCardImage className="react-icon" />
              )}
            </div>
          ))}
        </div>

        <div className="detail-product-image">
          <img src={selectedImage} alt={product.name} />
        </div>

        <div className="conteiner-info">      
          <div className="detail-product-info">
          <div className="conteiner-name-price">
            <h1 className="detail-product-name">{product.name}</h1>
            <h1 className="detail-product-price">
              $
              {(product.price * stock)            
              .toLocaleString("es-AR", {
                minimumFractionDigits: 0,
              })}
            </h1>
          </div>
            <section className="detail-product-section">
              <h2>Categoria:</h2>
              <h3>{product.categoryName}</h3>
            </section>
            <section className="detail-product-section">
              <h2>Estrellas:</h2>
              <h3>{product.rating}⭐</h3>
            </section>

            <section className="detail-product-section">
              <div className="container-description">
                <h2>Descripción:</h2>
                <p className="detail-product-description">
                  {product.description}
                </p>
              </div>
            </section>
          </div>
          <div className="review__cont">
          <Reviews></Reviews>
        </div>
        </div>
        
        <div className="detail-product-sales">
          <h2>Informacion sobre el vendedor</h2>
          <section className="detail-product-section">
            <h2>Vendedor:</h2>
            <Link to={`/profile/${product.userID}`}>
              <h3>{product.userName}</h3>
            </Link>
          </section>

					<section className="detail-product-section">
						<h2>Ubicación:</h2>
						<h3>{product.location}</h3>
					</section>
					<section className="detail-product-section">
						<h2>Estado:</h2>
						<h3>{product.status}</h3>
					</section>

          <section className="detail-product-section">
            <h2>Stock:</h2>
            <h3>{product.stock}</h3>
          </section>
          <div className=".detail-product-button">
            {/* <PaymentButton product={product} /> */}
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>

          {notification.isOpen && <div>{notification.content}</div>}
          <p>{error}</p>
        </div>

      </div>
    </div>
  );
};

export default DetailProduct;