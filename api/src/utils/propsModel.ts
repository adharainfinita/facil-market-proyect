export interface userProps {
	id: number;
	name: string;
	lastName: string;
	password: string;
	email: string;
	image: string;
}

export interface loginData {
	email: string
	password: string | number
}


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
	userID: number;
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
