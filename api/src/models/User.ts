import { Table, Column, Model, DataType } from "sequelize-typescript";
import moment from "moment";

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

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	active!: string;

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
		field: 'createdAt',
		get() {
			// Formatear la fecha utilizando Moment.js
			return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY HH:mm:ss');
		},
	})
	createdAt!: Date;
}



export default User;
