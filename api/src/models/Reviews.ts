import {Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Users from "./User";
import Products from "./Product";

@Table({
    tableName: 'reviews',
})

class Reviews extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text!: string

    @ForeignKey(() => Users)

    @BelongsTo(() => Users)
    user!: Users;

    @BelongsTo(() => Products)
    products!: Products;

}

export default Reviews