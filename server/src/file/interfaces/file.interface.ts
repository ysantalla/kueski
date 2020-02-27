import { Document } from 'mongoose';

export interface File extends Document {
    readonly  filename: string,
    readonly  originalname: string,    
    readonly  path: string,
    readonly  destination: string,
    readonly  mimetype: string,
    readonly  size: number,
    readonly  createdAt: Date,
    readonly  modifiedAt: Date
}