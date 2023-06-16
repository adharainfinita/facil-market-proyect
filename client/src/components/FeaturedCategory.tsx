import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/features/categorySlice";
import { RootState } from "../redux/store";
import { getCategory } from "../services/categoryServices";
import { Category } from "../utils/interfaces";

const FeaturedCategory = () => {

    const dispatch = useDispatch();
	const categories = useSelector((state: RootState) => state.category.value);

	useEffect(() => {
		// Aquí llamamos al servicio getCategory para obtener las categorías
		const fetchCategories = async () => {
			try {
				const response = await getCategory();
				if (response) {
					dispatch(getCategories(response));
				} else {
					console.error("Error al obtener las categorías");
				}
			} catch (error) {
				console.error("Error al obtener las categorías:", error);
			}
		};
		fetchCategories();
	}, [dispatch]);

    return (
        <div className="container-featured">

            <h2 className="title-featured">Categorias destacadas</h2>

            {categories.map((category: Category) => (
				<div className="container-featuredcategory">

                    <div key={category.id} className="image-featuredcategory">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="category-image"
                        />
					</div>
				        <h2 key={category.id}>{category.name}</h2>
				</div>
			))}
        </div>
    )
}

export default FeaturedCategory;
/* 
const FeaturedCategory = () => {

    return (
        <div className="container-featured">
            <h2 className="title-featured">Categorias destacadas</h2>
            <div className="container-featuredcategory">
                <div className="images-featuredcategory">
                    <div className="image-featuredcategory">
                        <img src="https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$" alt="smartphone" className='category-image'/>
                        <h2>Smartphone</h2>
                    </div>
                    <div className="image-featuredcategory">
                        <img src="https://www.rodo.com.ar/media/catalog/product/cache/855090a5c67e45b26c9e0d345e7592dc/3/4/348887_2.png" alt="electrodomestico" className='category-image'/>
                        <h2>Electrodomesticos</h2>
                    </div>
                    <div className="image-featuredcategory">
                        <img src="https://static.vecteezy.com/system/resources/previews/008/847/318/original/isolated-black-t-shirt-front-free-png.png" alt="indumentaria" className='category-image'/>
                        <h2>Indumentaria</h2>
                    </div>
                    <div className="image-featuredcategory">
                        <img src="https://www.pngplay.com/wp-content/uploads/7/House-PNG-Pic-Background.png" alt="inmuebles" className='category-image'/>
                        <h2>Inmuebles</h2>
                    </div>
                    <div className="image-featuredcategory">
                        <img src="https://www.pngall.com/wp-content/uploads/2016/07/Car-PNG-Picture.png"   alt="vehiculos" className='category-image'/>
                        <h2>Vehiculos</h2>
                    </div>
                    <div className="image-featuredcategory">
                        <img src="https://www.pngall.com/wp-content/uploads/2016/05/Armchair-PNG-Picture.png" alt="hogar" className='category-image'/>
                        <h2>Hogar</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCategory; */

//smartphone , laptops , electrodomesticos , indumentaria , vehiculos , hogar, inmuebles