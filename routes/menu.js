
import express from "express";
import menuController from "../controllers/menuController.js";
import { verifyToken } from "../helpers/auth.js";
const router = express.Router();

// Define las rutas para las operaciones CRUD de menús
router.post("/", menuController.create);
router.get("/getAll", menuController.getAll);
router.get("/:id", menuController.getById);
router.put("/:id", verifyToken, menuController.update);
router.delete("/:id", verifyToken, menuController.delete);

export default router;
