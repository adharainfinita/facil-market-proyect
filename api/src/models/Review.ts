import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Product from "./Product";
import moment from 'moment';

@Table({ tableName: "reviews" })
class Review extends Model {
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

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	fullName!: string;

	@BelongsTo(() => User)
	user!: User;

	@ForeignKey(() => Product)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	productID!: number;

	@BelongsTo(() => Product)
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

export default Review;
