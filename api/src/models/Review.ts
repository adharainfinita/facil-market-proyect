import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Product from "./Product"; // Importa el modelo Producto

@Table({ tableName: "reviews" })
export default class Review extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userID!: number;

	@BelongsTo(() => User)
	user!: User;

	@ForeignKey(() => Product) // Agrega esta línea para establecer la clave externa
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	productID!: number; // Cambia el nombre de la columna a productoID o el nombre de tu elección

	@BelongsTo(() => Product) // Agrega esta línea para definir la asociación con Producto
	product!: Product;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	text!: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	rating?: number;
}
