

import express from "express";
import uploadController from "../controllers/uploadController.js";
import multer from "multer";

const routerUpload = express.Router();

// Configuración de multer para almacenar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint para subir imágenes
routerUpload.post("/", upload.single("file"), (req, res) => uploadController.create(req, res));

export default routerUpload;
