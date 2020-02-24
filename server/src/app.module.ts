import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { CommonModule } from './commons/common.module';

import { File } from './file/file.entity';
import { FileModule } from './file/file.module';

import { User } from './user/user.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {

        return {
          type: "postgres",
          host: config.get('POSTGRES_HOST'),
          port: config.get('POSTGRES_PORT'),
          username: config.get('POSTGRES_USERNAME'),
          password: config.get('POSTGRES_PASSWORD'),
          database: config.get('POSTGRES_DATABASE'),
          entities: [File, User],
          synchronize: true,
          useUnifiedTopology: true,
          cache: {
            type: 'redis',
            options: {
              host: config.get('REDIS_HOST'),
              port: config.get('REDIS_PORT'),
            },
          },
        } as PostgresConnectionOptions;
        
      },
    }),
    CommonModule,
    FileModule,
    UserModule
  ],
})
export class AppModule {}
