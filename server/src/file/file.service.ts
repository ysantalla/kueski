import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findAll(): Promise<File[]> {
    return await this.fileRepository.find();
  }

  async create(file: File): Promise<File> {
    return await this.fileRepository.save(file);
  }
}
