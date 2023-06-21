import { Response } from "express";

export const logout = async (req: any, res: Response) => {
  try {
    // Aquí puedes realizar cualquier lógica necesaria para cerrar la sesión del usuario.
    // Por ejemplo, eliminar el token de autenticación o limpiar las variables de sesión.

    // Si estás utilizando express-openid-connect, puedes usar el método `req.logout()` para cerrar la sesión:
    req.logout();
    res.redirect("/");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};