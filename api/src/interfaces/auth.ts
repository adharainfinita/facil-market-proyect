export interface loginData {
	email: string;
	password: string;
}

export interface userInterface extends loginData {
	id: number;
	fullName: string;
	image?: string;
}
