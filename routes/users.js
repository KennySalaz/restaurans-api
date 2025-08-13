
import express from "express";
import UsersController from "../controllers/usersController.js";
import { verifyToken } from "../helpers/auth.js";
const routerUsers = express.Router();

// Rutas para operaciones de autenticación y perfil de usuario
routerUsers.post("/auth/register", UsersController.register);
routerUsers.post("/auth/login", UsersController.login);
routerUsers.get("/auth/profile", verifyToken, UsersController.profile);
routerUsers.get("/auth/profile/:id",  UsersController.getProfileUser);


// Endpoints adicionales (comentados)
// routerUsers.put("/auth/profile", UsersController.updateProfile);
// routerUsers.delete("/auth/profile", UsersController.deleteProfile);

export default routerUsers;
