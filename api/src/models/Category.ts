import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'categories' })
export default class Category extends Model {
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
