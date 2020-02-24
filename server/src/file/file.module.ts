import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { CommonModule } from 'src/commons/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    CommonModule
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
