import { hash, compare } from "bcryptjs";

const encrypt = async (password: string) => {
	const passwordHash = await hash(password, 8);
	return passwordHash;
};

const verified = async (password: string, passwordHash: string) => {
	const isCorrect = await compare(password, passwordHash);
	return isCorrect;
};

export { encrypt, verified };
