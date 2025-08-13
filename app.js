// Importa el framework Express para crear el servidor web
import express from "express";
// Importa y configura las variables de entorno desde un archivo .env
import "dotenv/config";
import routeRestaurant from "./routes/restaurant.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";
import routerUsers from "./routes/users.js";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./swagger/swagger.js";
import cors from 'cors';
import routerUpload from "./routes/upload.js";

// Crea una instancia de la aplicación Express
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
  swaggerOptions: {
    url: "/swagger.json",
  },
}));
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para parsear datos URL-encoded
app.use("/restaurant", routeRestaurant);
app.use("/users", routerUsers);
app.use("/upload", routerUpload);



try {
  // Define el puerto a usar, tomando el valor de la variable de entorno PORT o 3000 por defecto
  const PORT = process.env.PORT || 3000;
  // Inicia el servidor y muestra un mensaje en consola cuando está listo
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  // Si ocurre un error al iniciar el servidor, lo muestra en consola y termina el proceso
  console.error("Error starting the server:", error);
  process.exit(1);
}

process.on("SIGINT", (error) => {
  console.log("Received SIGINT. Shutting down gracefully...");
  dbClient.close();
  process.exit(0);
});
