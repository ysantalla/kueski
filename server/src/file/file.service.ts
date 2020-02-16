
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService extends TypeOrmCrudService<File> {
  constructor(@InjectRepository(File) repo) {
    super(repo);
  }
}