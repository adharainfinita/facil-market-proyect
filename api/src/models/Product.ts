import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Category from "./Category";
import User from "./User";

@Table({ tableName: "products" })
class Product extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	description?: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	stock!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	rating?: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	image?: string;

	//Cambié la condición de nulo de ubicación. Necesitamos saber donde se encuentra el produto.
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	location?: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	price!: number;

	//...... Relaciones

	@ForeignKey(() => Category)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	categoryID!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	categoryName!: string;

	@BelongsTo(() => Category)
	category!: Category;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userID!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	userName!: string;

	@BelongsTo(() => User)
	user!: User;
}

export default Product;
