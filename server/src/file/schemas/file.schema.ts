import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
    mimetype: String,
    filename: String,
    originalname: String,    
    destination: String,
    path: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
})
