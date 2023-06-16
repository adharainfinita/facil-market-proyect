//! Dejar aquí todas las interfaces

// Interfaces de de estados global
export interface User {
	id: string;
	name: string;
	lastName: string;
	email: string;
	password: string;
	image: string;
}

export interface Product {
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
	userName: string;
}

export interface Category {
	id: number;
	name: string;
}

// Interfaces de servicios
export interface productData {
	id: number;
	name: string;
	description: string;
	stock: number;
	rating: number;
	image: string;
	location: string;
	price: number;
}

// Interfaces para formularios
export interface newUser {
	name: string;
	lastName: string;
	password: string;
	email: string;
	image: string;
	confirm?: string;
}

export interface UserData {
	password: string | number;
	email: string | number;
}

// Interfaces de componentes

export interface FormData {
	userID: number;
	categoryID?: number;
	name: string;
	description: string;
	stock?: number;
	rating?: number;
	image: string;
	location: string;
	price?: number;
}
