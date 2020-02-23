import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';


@ApiTags('auth')
@Controller('/auth')
export class AuthController{
  constructor(public service: UserService) {}

  
}
