import {Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript"
import ProductCategories from "./relations/ProductCategories";
import Products from "./Product";



@Table({
    tableName: 'categories',
})

class Categories extends Model {
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

    @BelongsToMany(() => Products, () => ProductCategories)
    products!: Products[];
    // async addProducts(product: Products): Promise<void> {
    //   await this.$add("products", product);
    // }
}



export default Categories