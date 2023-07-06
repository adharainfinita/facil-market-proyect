export interface ProductProps {
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

export interface paymentProps {
	order: number;
	sellerID: number | string;
	buyerID: string | number;
	grossAmount: number;
	netAmount: number;
	limitDate: Date;
	resume: Array<number>;
}

export interface resumeProps {
	additional_info: additional_info;
	collector_id: number;
	currency_id: string;
}
export interface additional_info {
	ip_address: string;
	items: Array<items>;
	payer: string;
}

export interface items {
	category_id: string;
	description: string | null;
	id: string;
	title: string;
	unit_price: string;
}

export interface cartProductProps {
	id: number;
	userID: number;
	productID: Array<BuyProduct>;
}
export interface purchases {
	userId?: number;
	products?: Array<BuyProduct>;
	paymentId: number;
}

export interface BuyProduct {
	id: number;
	name: string;
	price: number;
	categoryID?: number;
	image: string;
	quantity: number;
}

export interface PaymentProductsProps {
	products: Array<BuyProduct>;
}

export interface ArrayCart {
	productId: number
	quantity: number
}