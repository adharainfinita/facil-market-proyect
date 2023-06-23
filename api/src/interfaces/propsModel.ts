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
	categoryName: string;
	userID: number;
	userName: string;
}

export interface reviewProps {
	id: number;
	userID: number;
	productID: number;
	text: string;
	rating: number;
}

export interface categoryProps {
	id: number;
	name: string;
	image: string;
}
