
import Category from "../models/Category";

interface localProps{
	name: string
}


const createCategory = async ({name}: localProps) => {

	// Verificar si la categoría ya existe
	const existingCategory = await Category.findOne({
		where: { name },
	});
	if (existingCategory) {
		throw Error("The category already exists");
	}

	return await Category.create({name});
};

export default createCategory;
