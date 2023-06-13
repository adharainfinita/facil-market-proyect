import {Model, Table, Column, DataType, HasMany} from "sequelize-typescript";
import Products from "./Product";
import Reviews from "./Reviews";

@Table({
    tableName: 'users',
})

class Users extends Model {
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
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    pasword!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image!: string

    
    @HasMany(() => Products)
    products!: Products;

    
    @HasMany(()=> Reviews)
    reviews!: Reviews;
}

export default Users
