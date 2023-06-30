export interface productProps {
	id: number;
	name: string;
	description?: string;
	unities?: number;
	stock?: string;
	rating?: number;
	image?: string;
	location?: string;
	price?: number;
	categoryID?: number;
	categoryName?: string;
	userID: number;
	userName?: string;
	status?: string;
}

export interface reviewProps {
	id: number;
	fullName: string;
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

export interface purchases {
	userId?: number
	productId?: number
	paymentId: number
}

export interface BuyProduct {
	id: number
    name: string,
    price: number,
    image: string,
    quantity: number
}
