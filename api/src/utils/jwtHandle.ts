import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "token-random";

const generateToken = async (id: string) => {
	const jwt = sign({ id }, JWT_SECRET, { expiresIn: "6h"});
	return jwt;
};

const verifyToken = (jwt: string) => {
	const isUser = verify(jwt, JWT_SECRET);
	return isUser;
};

export { generateToken, verifyToken };

