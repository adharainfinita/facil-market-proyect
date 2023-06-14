import Category from "../models/Category"

interface localProps{
    id?: number,
    // categoryID?: number
 }
 
 const findUser = async({id}:localProps) =>{

    return await Category.findByPk(id)
 }
 export default findUser