import express from "express";
import restaurantController from "../controllers/restaurantController.js";
import { verifyToken } from "../helpers/auth.js";
const router = express.Router();

// Define las rutas para las operaciones CRUD de restaurants
router.post("/", restaurantController.create);
router.get("/getAll", restaurantController.getAll);
router.get("/:id", restaurantController.getById);
router.put("/:id", verifyToken, restaurantController.update);
router.delete("/:id", verifyToken, restaurantController.delete);

export default router;
