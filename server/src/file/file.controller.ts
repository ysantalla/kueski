import { unlinkSync } from 'fs';
import * as path from 'path';

import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Res, Delete, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { FileService } from './file.service';
import { File } from './file.entity';

import { storageOptions } from './file.common';
import { FileUploadDto } from './dto/file.dto';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { RolesGuard } from 'src/commons/guards/roles.guard';


interface CreateFile {
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
    ) {}

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }  

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageOptions
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload File',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: CreateFile): Promise<File> {
    
    const entity: File = new File();
    entity.mimetype = file.mimetype;
    entity.name = file.filename;
    entity.size = file.size;
    entity.path = file.path;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return await this.fileService.create(entity)
  }

  @Get('download/:filename')
  async serveFile(@Param('filename') data: string, @Res() res: any): Promise<any> {
    res.sendFile(data, { root: 'uploads'});    
  }

  @Delete(':filename')
  @Roles('user')
  @UseGuards(RolesGuard)
  async deleteFile(@Param('filename') filename: string ): Promise<string> {
    const rootPath = path.join('.');
    return new Promise((resolve, reject) => {
      try {
        unlinkSync(`${rootPath}/uploads/${filename}`);
        resolve(filename);
      } catch (err) {
        resolve("Error: File not found");
      }
    });  
  }
}
