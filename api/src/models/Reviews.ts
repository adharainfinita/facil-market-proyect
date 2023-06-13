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
    @BelongsTo(() => Users, {as:"userReview"})
    userID!: Users;

    
    @ForeignKey(()=> Products)
    @BelongsTo(() => Products, { as:"productReview"})
    productID!: Products;

}

export default Reviews