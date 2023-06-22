export interface productProps {
	id: number;
	name: string;
	description: string;
	stock: number;
	rating: number;
	image: string;
	location: string;
	price: number;
	categoryID: number;
	nameCategory: string;
	userID: string;
}

export interface reviewProps {
	id: number;
	userID: string;
	productID: number;
	text: string;
	rating: number;
}

export interface categoryProps {
	id: number;
	name: string;
	image: string;
}
