import { Table, Model, ForeignKey, BelongsTo, Column, DataType } from "sequelize-typescript";
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

	@Column({ type: DataType.ARRAY(DataType.JSON) })
  	products!: number[];

	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	paymentId!: number;

	@BelongsTo(() => User)
	user!: User;  
}

export default Purchase;