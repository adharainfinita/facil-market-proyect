import {Model, Table, Column, DataType, BelongsToMany, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript"
import Categories from "./Category";
import Users from "./User";
import ProductCategories from "./relations/ProductCategories";
import Reviews from "./Reviews";
//investigrar @Scopes

@Table({
    tableName: 'products',
})

class Products extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true   
    })
    id!: number 

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,

    })
    stock!: number

    @Column({
        type: DataType.FLOAT,
        allowNull: false,

    })
    calification!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    image!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    location!: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false,

    })
    price!: number

    @ForeignKey(() => Users)
    //relaciones
    @BelongsToMany(() => Categories, () => ProductCategories, "productId",  'categoryId')
    categories!: Categories[];
    async addCategory(category: Categories): Promise<void> {
      await this.$add("categories", category);
    } 

    @BelongsTo(() => Users)
    user!: Users;

    @HasMany(()=> Reviews)
    reviews!: Reviews

}

export default Products