import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';

import { CommonModule } from 'src/commons/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/file.schema';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])
    
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
