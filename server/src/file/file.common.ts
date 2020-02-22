import { diskStorage } from "multer";
import { extname } from "path";

// Multer
export const storageOptions = diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${extname(file.originalname)}`);
  }
});