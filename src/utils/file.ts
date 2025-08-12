import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";

const uploadDir = path.join(__dirname, "..", "..", "public/uploads");

export const uploadProfileImage = (file: UploadedFile): string => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  file.mv(filePath, (err) => {
    if (err) throw err;
  });

  return fileName;
};

export const deleteProfileImage = (fileName: string) => {
  const filePath = path.join(uploadDir, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
