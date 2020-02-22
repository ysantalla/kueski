import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  ParsedRequest,
  Override,
} from '@nestjsx/crud';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
})
@ApiTags('users')
@Controller('/users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override('getManyBase')
  getAll(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }
}
