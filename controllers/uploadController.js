class uploadController {
  constructor() {}
  async create(req, res) {
    try {
      // Validar que se recibió un archivo
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "No se recibió ningún archivo" });
      }
      // Importar el servicio AWS dinámicamente
      const AWSService = (await import("../common/services/aws.service.js"))
        .default;
      // Instanciar el servicio
      const awsService = new AWSService();
      // Obtener nombre de carpeta y archivo desde el body
      const folder = req.body.folder;
      let filename = req.body.filename || req.file.originalname;
      filename = filename.replace(/\s+/g, ""); // Elimina todos los espacios
      console.log("Uploading file:", filename, "to folder:", folder);
      // Validar que el nombre del archivo no esté vacío
      if (!filename) {
        return res
          .status(400)
          .json({ message: "El nombre del archivo es requerido" });
      }
      // Validar que la carpeta no esté vacía
      if (!folder) {
        return res
          .status(400)
          .json({ message: "Debe especificar el nombre de la carpeta" });
      }
      // Subir el archivo al bucket S3 en la carpeta indicada, pasando el tipo MIME
      const mimetype = req.file.mimetype || "application/octet-stream";
      const result = await awsService.upload(
        folder,
        filename,
        req.file.buffer,
        mimetype
      );
      if (result.success) {
        // Retornar la URL del archivo subido
        const key = result.key;
        /*  const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`; */
        const url = key;
        console.log("File uploaded successfully:", url);
        return res.status(201).json({ url });
      } else {
        return res
          .status(500)
          .json({ message: "Error al subir a S3", error: result.error });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno", error: error.message });
    }
  }
}

export default new uploadController();
