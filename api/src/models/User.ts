import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Purchase from "./Purchase";

@Table({ tableName: "users" })
class User extends Model {
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
	fullName!: string;

	/* 	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	lastName!: string;
 */

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	image!: string;

	@HasMany(() => Purchase)
  	purchases!: Purchase[];
}

export default User;
