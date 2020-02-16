import { Module } from '@nestjs/common';
import { File } from './file.entity';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    providers: [FilesService],
    controllers: [FilesController],
})
export class FileModule {}
