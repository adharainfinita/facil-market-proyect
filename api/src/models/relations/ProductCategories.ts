import { Model, Table, Column, ForeignKey } from "sequelize-typescript";
import Product from "../Product";
import Categories from "../Category";

@Table({
	tableName: "products_categories",
})
class ProductCategories extends Model {
	@ForeignKey(() => Categories)
	@Column
	categoryId!: number;

	@ForeignKey(() => Product)
	@Column
	productId!: number;
}

export default ProductCategories;
