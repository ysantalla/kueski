import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {        
        return {
          secret: configService.get('SECRET'),
        } as JwtModuleOptions;
      },
      
    }),
  ],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
  controllers: [UserController, AuthController],
})
export class UserModule {}
