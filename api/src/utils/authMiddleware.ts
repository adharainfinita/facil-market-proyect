/* import jwt from "jsonwebtoken";
import expressJwt, { RequestHandler } from "express-jwt";
import { Request, Response } from "express";
const jwtSecret = "tu-secreto-jwt"; // Reemplaza con tu propio secreto JWT

// Define el middleware de autenticación checkJwt
export const checkJwt: RequestHandler = expressJwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
  // Puedes agregar opciones adicionales según tus necesidades, como configurar el nombre del token en la solicitud
}).unless({ path: ["/login", "/signup"] }); // Excluye las rutas de inicio de sesión y registro del middleware de autenticación

// Middleware para obtener el usuario autenticado desde el token
export const getUserFromToken: RequestHandler = (req: Request, _res: Response) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.substring(7);
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Guarda los datos del usuario en la solicitud
  }
  next();
};
 */