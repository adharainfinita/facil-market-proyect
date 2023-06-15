import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "categories" })
class Category extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
}
<<<<<<< HEAD
=======
export default Category;
>>>>>>> f4046072e2f867c2325aa6668c9cff5e3cc0b86b
