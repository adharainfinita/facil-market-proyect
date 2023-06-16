import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "categories" })
class Category extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	
	// ! AGREGADO PARA QUE QUEDEN CREADAS LAS CATEGORIAS POR DEFAULT SI YA EXISTEN NO SE DUPLICAN
	public static async loadDefaultCategories() {
		const defaultCategories = [
			{ name: "Ropa y accesorios" },
			{ name: "Computación" },
			{ name: "Smartphone" },
			{ name: "Electrodomesticos" },
			{ name: "Indumentaria" },
			{ name: "Inmuebles" },
			{ name: "Vehiculos"},
			{ name: "Hogar"},
			{ name: "Belleza"},
			{ name: "Libros"},
		];
	
		for (const categoryData of defaultCategories) {
			const [category, created] = await Category.findOrCreate({
				where: { name: categoryData.name },
				defaults: categoryData,
			});
	
			if (created) {
				console.log(`Created category: ${category.name}`);
			} else {
				console.log(`Category ${category.name} already exists.`);
			}
		}
	}
}
export default Category