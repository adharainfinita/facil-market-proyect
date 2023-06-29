import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "categories" })
class Category extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	image!: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	highlight!: boolean;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	// ! AGREGADO PARA QUE QUEDEN CREADAS LAS CATEGORIAS POR DEFAULT SI YA EXISTEN NO SE DUPLICAN
	public static async loadDefaultCategories() {
		const defaultCategories = [
			{
				name: "Accesorios",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: false,
			},
			{
				name: "Computación",
				image:
					"https://w7.pngwing.com/pngs/426/410/png-transparent-black-dell-computer-monitor-set-illustration-laptop-personal-computer-computer-repair-technician-computer-desktop-pc-electronics-computer-computer-monitor-accessory-thumbnail.png",
				highlight: true,
			},
			{
				name: "Celular",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},
			{
				name: "Electrodomesticos",
				image:
					"https://www.nicepng.com/png/detail/295-2957720_conjunto-de-electrodomsticos-en-lnea-blanca-warranty-appliances.png",
				highlight: true,
			},
			{
				name: "Indumentaria",
				image:
					"https://w7.pngwing.com/pngs/987/597/png-transparent-assorted-color-clothes-on-clothes-rack-t-shirt-clothing-armoires-wardrobes-closet-clothes-hanger-clothing-retail-fashion-top-thumbnail.png",
				highlight: true,
			},
			{
				name: "Inmuebles",
				image:
					"https://e7.pngegg.com/pngimages/548/445/png-clipart-house-real-estate-apartment-property-sales-house-building-bathroom.png",
				highlight: true,
			},
			{
				name: "Vehiculos",
				image:
					"https://e7.pngegg.com/pngimages/227/351/png-clipart-infiniti-used-car-sport-utility-vehicle-car-dealership-car-compact-car-sedan.png",
				highlight: true,
			},
			{
				name: "Hogar",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: false,
			},
			{
				name: "Belleza",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: false,
			},
			{
				name: "Libros",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: false,
			},
			{
				name: "Otros",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: false,
			},
		];

		for (const categoryData of defaultCategories) {
			const [category, created] = await Category.findOrCreate({
				where: { name: categoryData.name, image: categoryData.image },
				defaults: categoryData,
			});

			if (created) {
				console.log(`Created category: ${category.name}, ${category.image}`);
			} else {
				console.log(
					`Category ${category.name}, ${category.image} already exists.`
				);
			}
		}
	}
}
export default Category;
