import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "token-random";

const generateToken = async (id: string) => {
	const jwt = sign({ id }, JWT_SECRET /*  { expiresIn: "2h" } */);
	return jwt;
};

const verifyToken = (jwt: string) => {
	const isUser = verify(jwt, JWT_SECRET);
	return isUser;
};

export { generateToken, verifyToken };
