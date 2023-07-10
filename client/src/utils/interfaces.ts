//! Dejar aquí todas las interfaces
export interface UXDataLogin {
	id: string;
	image: string;
	token: string;
}

// Interfaces de de estados global
export interface BasicData {
	totalProducts: number;
	totalUsers: number;
	totalSales: number;
	ProductsOnAccesories: object;
}

export interface Cart {
	id: number;
	userID: number;
	productID: Array<BuyProduct>;
}

export interface AnalyticsData {
	productsInfo: Array<ContentProductData>;
	allUsers: Array<ContentUserData>;
}
export interface ContentProductData {
	id: number;
	createdAt: CreatedAt;
	rating: number;
}

export interface ContentUserData {
	id: number;
	createdAt: CreatedAt;
	LevelOfActivity: number;
}

export interface CreatedAt {
	dateObject: Date;
	timeObject: Date;
}

export interface Date {
	resume: string;
	day: number;
	month: number;
	year: number;
}

export interface User {
	id: string;
	fullName: string;
	email: string;
	password: string;
	image: string;
	active?: boolean;
	admin?: boolean
}

export interface FiltersCache {
	status: string | undefined;
	categoryName: string | undefined;
	location: string | undefined;
}
//stock: 'Disponible, agotado, en proceso' Unidades: 1,2,3
export interface Product {
	id: number;
	name: string;
	description: string;
	status: string;
	unities: number;
	stock: string;
	rating: number;
	images: string[];
	location: string;
	price: number;
	categoryID: number;
	categoryName: string;
	userID: string;
	userName: string;
	active: boolean;
	/* cartQuantity?: number; */
	quantity: number;
}

//?probando
export interface PaymentProduct {
	products: Array<Product>;
}

export interface Category {
	id: number;
	name: string;
	image: string;
	highlight: boolean;
}

// Interfaces de servicios
export interface productData {
	id: number;
	name: string;
	description: string;
	status: string;
	stock: string;
	unities: number;
	rating: number;
	image: string[];
	location: string;
	price: number;
}

// Interfaces para formularios de registro
export interface NewUser {
	fullName: string;
	password: string;
	email: string;
	image?: string;
	confirm?: string;
}


export interface UserData {
	token: string;
	user: User;
}

export interface LoginData {
	email: string;
	password: string | number;
}

//? Interfaces de componentes

export interface NotificationType {
	isOpen: boolean;
	type: "approved" | "failure" | null;
	content: string;
}

export interface FormCreateProduct {
	userID: number;
	categoryID: number;
	name: string;
	description: string;
	unities: number;
	status: string;
	stock: string;
	rating?: number;
	image?: string[];
	location: string;
	price: number;
}

export interface ErrorsFormProduct {
	userID: number;
	categoryID: number;
	name: string;
	description: string;
	unities: string;
	status: string;
	rating?: string;
	images?: string;
	location: string;
	price: string;
}

export interface isLogin {
	fullName: string;
	id: string;
	email: string;
	image: string;
	admin: boolean;
}

export interface GoogleUser {
	name: string;
	sub: string;
	email: string;
	picture: string;
}

export interface Review {
	id: number;
	userID: number;
	fullName: string;
	rating: number;
	text: string;
}
export interface Purchase {
	id: number;
	userId: number;
	products: Array<BuyProduct>;
	paymentId: number;
	createdAt: string;
}

export interface BuyProduct {
	id: number;
	name: string;
	price: number;
	image: string;
	quantity: number;
}

export interface Stock {
	id: number;
	unities: number;
}

export interface ArrayCart {
	productId: number;
	quantity: number;
}

export interface resumes {
	createdAt: string;
	order: number;
	sellerID: number;
	grossAmount: number;
	netAmount: number;
	status: string;
	buyerID: number;
	message: string | null;
	limitDate: string;
	items: Product[]
}
