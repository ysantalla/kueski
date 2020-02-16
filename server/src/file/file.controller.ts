import { Controller } from '@nestjs/common';
import { FilesService } from './file.service';
import { Crud } from '@nestjsx/crud';

import { File } from './file.entity';

@Crud({
  model: {
    type: File,
  },
})

@Controller('files')
export class FilesController {
  constructor(public service: FilesService) {}
}