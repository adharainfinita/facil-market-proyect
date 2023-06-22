//! Dejar aquí todas las interfaces
export interface UXDataLogin {
	id: string;
	image: string;
}
// Interfaces de de estados global
export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

export interface FiltersCaché {
	userName: string | undefined;
	categoryName: string | undefined;
	location: string | undefined;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  rating: number;
  image: Array<string>;
  location: string;
  price: number;
  categoryID: number;
  categoryName: string;
  userID: number;
  userName: string;
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
  stock: number;
  rating: number;
  image: string;
  location: string;
  price: number;
}

// Interfaces para formularios
export interface NewUser {
  name: string;
  lastName: string;
  password: string;
  email: string;
  image: string;
  confirm?: string;
}

export interface UserData {
	name: string;
	lastName: string;
	password: string | number;
	email: string | number;
	id: string;
	image: string;
}

//? Interfaces de componentes

export interface FormCreateProduct {
  userID: number;
  categoryID: number;
  name: string;
  description: string;
  stock: number;
  rating?: number;
  image: string[];
  location: string;
  price: number;
}

export interface ErrorsFormProduct {
	userID: number;
	categoryID: number;
	name: string;
	description: string;
	stock: string;
	rating?: string;
	image: string;
	location: string;
	price: string;
}
