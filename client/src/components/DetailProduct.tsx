import useProduct from "../hooks/useProduct";
import { BsCardImage } from "react-icons/bs";
import PaymentButton from "./PaymentButton";
import {useEffect, useState} from 'react';
import { NotificationType } from "../utils/interfaces";




const DetailProduct = () => {

	const product = useProduct();
	const [notificacion, setNotification] = useState<NotificationType>({
		isOpen: false,
		type: null,
		content: ""
	})

	useEffect(()=>{
		const urlParams = new URLSearchParams(window.location.search);
		const status = urlParams.get("status");

		if(status === 'approved'){
			setNotification({
				content: "Pago aprobado😎",
				isOpen: true,
				type: 'approved'
			})}

		if(status === 'failure'){
				setNotification({
					content: "Pago rechazado😢",
					isOpen: true,
					type: 'failure'
				})
		}

		;

	}, [])
	

  return (
    <div className="detail-product-container">
      <div className="detail-product">
        <div className="conteiner-pre-image">
          {product.image.map((img:string, index:number) => {
            return (
              <div key={index} className="pre-image">
                {img[index] ? (
                  <img className="preview-image" src={img} alt="preview images" />
                ) : (
                  <BsCardImage className="react-icon" />
                )}
              </div>
            );
          })}
        </div>

        {/*//? Imagenes principal del producto */}
        <div className="detail-product-image">
          <img src={product?.image[0]} alt={product.name} />
        </div>

        {/*//? Informacion general del producto */}
        <div className="conteiner-info">
          <div className="conteiner-name-price">
            <h1 className="detail-product-name">{product.name}</h1>
            <h1 className="detail-product-price">
              $
              {product.price.toLocaleString("es-AR", {
                minimumFractionDigits: 0,
              })}
            </h1>
          </div>

          <div className="detail-product-info">
            <section className="detail-product-section">
              <h2>Categoria:</h2>
              <h3>{product.categoryName}</h3>
            </section>

            <section className="detail-product-section">
              <h2>Reseñas:</h2>
              <h3>{product.rating}</h3>
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
        </div>

        {/*//? Informacion general las ventas */}
        <div className="detail-product-sales">
          <h2>Informacion sobre el vendedor</h2>
          <section className="detail-product-section">
            <h2>Vendedor:</h2>
            <h3>{product.userName}</h3>
          </section>

          <section className="detail-product-section">
            <h2>Ubicación:</h2>
            <h3>{product.location}</h3>
          </section>

					<section className="detail-product-section">
						<h2>Unidades:</h2>
						<h3>{product.stock}</h3>
					</section>
							<PaymentButton product={product} />
						{notificacion.isOpen && (
							<div>
								{notificacion.content}
							</div>
						)}
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;