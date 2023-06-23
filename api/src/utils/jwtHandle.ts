import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "token-random";

const generateToken = async (user: any) => {
	const jwt = sign({ user }, JWT_SECRET, { expiresIn: "6h" });
	return jwt;
};

const verifyToken = (jwt: string) => {
	const isUser = verify(jwt, JWT_SECRET);
	return isUser;
};

export { generateToken, verifyToken };
