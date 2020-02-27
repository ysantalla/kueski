import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

function makeid(length) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Multer
export const storageOptions = diskStorage({
  destination: (req, file, callback) => {  
    const directory = path.join('.', `uploads/${makeid(5)}`);
    try {
      fs.statSync(directory);
    } catch (err) {
      fs.mkdirSync(directory);
    }
    
    callback(null, directory);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

