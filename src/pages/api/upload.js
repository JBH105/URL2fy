import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const accessKeyId = process.env.ACCESSKEYID;
console.log(accessKeyId, "accessKeyId");

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKETNAME;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({
    multiples: true, // Enable multipart file uploads
    // maxFileSize: 20 * 1024 * 1024, // Set a reasonable maximum file size (e.g., 10MB)
  });
  form.parse(req, async (err, fields, files) => {
    if (!files) {
      return res.status(500).json({ message: "No file uploaded" });
    }
    try {
      const params = {
        Bucket: bucketName,
        Key: files.file[0].originalFilename,
        Body: fs.createReadStream(files.file[0].filepath),
      };
      const data = await s3.upload(params).promise();
      res
        .status(200)
        .send({ message: "URL Create successfully", url: data.Location });
      // res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error uploading file to S3" });
    }
  });
}
