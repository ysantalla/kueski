import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/commons/common.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, AuthController],
})
export class UserModule {}
