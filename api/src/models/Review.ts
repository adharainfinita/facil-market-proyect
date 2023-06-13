import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'reviews' })
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


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text!: string;
}
