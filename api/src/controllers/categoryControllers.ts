import Category from "../models/Category";

interface localPropsCreate {
	name: string;
	image: string;
	highlight: false;
}
interface localPropsFinder {
	id: number;
}

export const createCategory = async ({
	name,
	image,
	highlight = false,
}: localPropsCreate) => {
	//? Verificar si la categoría ya existe
	const existingCategory = await Category.findOne({
		where: { name },
	});
	if (existingCategory) {
		throw Error("The category already exists");
	}

	return await Category.create({ name, image, highlight });
};

export const findAllCategories = async () => await Category.findAll();

export const findCategoryByID = async ({ id }: localPropsFinder) => {
	return await Category.findByPk(id);
};
