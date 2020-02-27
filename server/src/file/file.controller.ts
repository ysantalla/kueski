import * as path from 'path';
import * as fs from 'fs';

import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Res, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { FileService } from './file.service';


import { storageOptions } from './file.common';
import { FileUploadDto } from './dto/file.dto';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { File } from './interfaces/file.interface';
import { Response } from 'express';


@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
    ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageOptions
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload File',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: File): Promise<File> {
    return await this.fileService.create(file);
  }

  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const file = await this.fileService.getFileById(id);
      const filePath = path.join('.', file.path);
      if (fs.existsSync(filePath)) {
          res.header('Content-disposition', 'attachament; filename=' + file.filename);
          res.header('Content-type', file.mimetype);
          res.download(filePath, file.filename);
      } else {
        res.sendStatus(HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }    
  }

  @Delete(':filename')
  @Roles('user')
  @UseGuards(RolesGuard)
  async deleteFile(@Param('filename') filename: string ): Promise<string> {
    const rootPath = path.join('.');
    return new Promise((resolve, reject) => {
      try {
        fs.unlinkSync(`${rootPath}/uploads/${filename}`);
        resolve(filename);
      } catch (err) {
        resolve("Error: File not found");
      }
    });  
  }
}
