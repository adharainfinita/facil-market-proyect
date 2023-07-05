import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import moment from "moment";
import { ArrayCart } from "../interfaces/propsModel";

@Table({ tableName: "cart" })
class Cart extends Model {
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

	//? Agregar clave foránea de Product
	@Column({
		type: DataType.ARRAY(DataType.JSON),
		allowNull: true,
	})
	productID?: Array<ArrayCart>;

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
}

export default Cart;
