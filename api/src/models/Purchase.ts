import {
	Table,
	Model,
	ForeignKey,
	BelongsTo,
	Column,
	DataType,
} from "sequelize-typescript";
import Product from "./Product";
import User from "./User";

@Table({ tableName: "purchases" })
class Purchase extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@ForeignKey(() => User)
	@Column
	userId!: number;

	@ForeignKey(() => Product)
	@Column
	productId!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	paymentId!: number;

	@BelongsTo(() => User)
	user!: User;

	@BelongsTo(() => Product)
	product!: Product;
}

export default Purchase;
