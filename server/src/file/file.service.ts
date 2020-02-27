import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File } from './interfaces/file.interface';

@Injectable()
export class FileService {
    constructor(
        @InjectModel('File') private readonly fileModel: Model<File>)
    {}

    async create(createFile: File): Promise<File> {
        const model = new this.fileModel(createFile);
        return model.save();
    }

    async getFileById(id: string): Promise<File> {
        return this.fileModel.findById(id)
            .then((file) => file)
            .catch((err) => {
                throw err;                
            });
    }
    
}
