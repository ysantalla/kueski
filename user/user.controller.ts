import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('/user')
export class UserController{
  constructor(public service: UserService) {}

  
}
