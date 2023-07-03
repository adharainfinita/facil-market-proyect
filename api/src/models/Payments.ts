import { Table, Column, Model, DataType } from "sequelize-typescript";
import moment from "moment";
import Product from "./Product";

@Table({ tableName: "payments" })
class Payments extends Model {
	//id de la operación
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	order!: number;

	//ID del vendedor (al que hay que pagarle)

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	sellerID!: number;

	//Monto bruto, es decir el total sin quitar el porcentaje

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	grossAmount!: number;

	//Monto neto, el valor que será pagado al seller

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	netAmount!: number;

	//Estado de la operación

	@Column({
		type: DataType.ENUM("pending", "payed", "unresolved"),
		allowNull: false,
		defaultValue: "pending",
	})
	status!: string;

	//ID del comprador

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	buyerID!: number;

	//Texto de aclaración, particularidad o mensaje

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	message!: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	limitDate!: Date;

	@Column({
		type: DataType.ARRAY(DataType.JSON),
		allowNull: false,
	})
	items!: Array<Product>;

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
		field: "createdAt",
		get() {
			// Formatear la fecha utilizando Moment.js
			return moment(this.getDataValue("createdAt")).format(
				"DD-MM-YYYY HH:mm:ss"
			);
		},
	})
	createdAt!: Date;
}

export default Payments;
