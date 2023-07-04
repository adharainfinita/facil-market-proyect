import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import Category from "./Category";
import User from "./User";
import Purchase from "./Purchase";
import moment from "moment";

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
	unities!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	rating?: number;

	@Column({
		type: DataType.ARRAY(DataType.STRING),
		allowNull: false,
	})
	images!: string[];

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	status!: string;

	@Column({
		type: DataType.ENUM("Disponible", "Agotado", "En proceso"),
		allowNull: false,
		defaultValue: "Disponible",
	})
	stock!: string;

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

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
		field: "createdAt",
		get() {
			//? Formatear la fecha utilizando Moment.js
			return moment(this.getDataValue("createdAt")).format(
				"DD-MM-YYYY HH:mm:ss"
			);
		},
	})
	createdAt!: Date;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	active!: string;

	//? Relaciones
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

	@HasMany(() => Purchase)
	purchases!: Purchase[];
}

export default Product;
