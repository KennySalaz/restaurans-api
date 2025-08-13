import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default class AWSService {
  constructor() {
    this._s3 = new S3Client({ region: "us-east-2" });
    this._bucket = process.env.AWS_BUCKET;
  }

  async upload(folder, name, data, mimetype = "application/octet-stream") {
    console.log("Uploading to S3: ===============>", folder, name);
    console.log("Data size: ===================>", data.length, "bytes");
    try {
      const buffer = data;
      const key = process.env.NODE_ENV + "/" + folder + "/" + name;
      const resp = await this._s3.send(
        new PutObjectCommand({
          ACL: "public-read",
          Bucket: this._bucket,
          Key: key,
          Body: buffer,
          ContentType: mimetype,
        })
      );
      if (resp) {
        return { success: true, key };
      }
      return { success: false, error: "No response from S3" };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  }
}
