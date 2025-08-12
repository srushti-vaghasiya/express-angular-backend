import { UploadedFile } from "express-fileupload";
import path from "path";

export function validateProfileImage(file: UploadedFile) {
  const allowedExt = [".png", ".jpg", ".jpeg"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!file) throw new Error("No file uploaded");

  const ext = path.extname(file.name).toLowerCase();
  if (!allowedExt.includes(ext)) throw new Error("Invalid file type");

  if (file.size > maxSize) throw new Error("File size exceeds 2MB");
}
