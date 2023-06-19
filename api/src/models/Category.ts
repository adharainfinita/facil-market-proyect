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
				highlight: true,
			},

			{
				name: "Computación",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Smartphone",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Electrodomesticos",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Indumentaria",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Inmuebles",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Vehiculos",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Hogar",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Belleza",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
			},

			{
				name: "Libros",
				image:
					"https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a235mlbearo/gallery/ar-galaxy-a23-sm-a235-sm-a235mlbearo-532206854?$650_519_PNG$",
				highlight: true,
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
