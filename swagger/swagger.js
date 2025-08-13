import swaggerJsdoc from "swagger-jsdoc";
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo base swagger.yml
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yml'));

// Cargar todos los esquemas
const schemasDir = path.join(__dirname, 'schemas');
const schemas = {};
fs.readdirSync(schemasDir).forEach(file => {
  if (file.endsWith('.yml')) {
    const schemaContent = YAML.load(path.join(schemasDir, file));
    Object.assign(schemas, schemaContent);
  }
});

// Cargar todos los paths
const pathsDir = path.join(__dirname, 'paths');
const paths = {};
fs.readdirSync(pathsDir).forEach(file => {
  if (file.endsWith('.yml')) {
    const pathContent = YAML.load(path.join(pathsDir, file));
    // Extraer los tags y añadirlos a la colección de tags
    if (pathContent.tags && Array.isArray(pathContent.tags)) {
      if (!swaggerDocument.tags) {
        swaggerDocument.tags = [];
      }
      swaggerDocument.tags = swaggerDocument.tags.concat(pathContent.tags);
    }
    // Extraer los paths
    if (pathContent.paths) {
      Object.assign(paths, pathContent.paths);
    }
  }
});

// Asignar esquemas y paths al documento final
swaggerDocument.components = swaggerDocument.components || {};
swaggerDocument.components.schemas = schemas;
swaggerDocument.paths = paths;

export default swaggerDocument;
