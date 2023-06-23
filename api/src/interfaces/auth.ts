/* export interface userInterface {
	id: number;
	name: string;
	lastName: string;
	password: string;
	email: string;
	image: string;
} */
//ME QUEDO CON LA PROPIEDAD NAME Y PASSWORD
//export type loginData = Pick<userProps, "name" | "password">;
//OMITO LAS PROPIEDADES QUE NO QUIERO
//export type loginData = Omit<userProps, "id" | "name" | "lasName" | "image">;

export interface loginData {
	email: string;
	password: string;
}

export interface userInterface extends loginData {
	id: number;
	fullName: string;
	image?: string;
}
