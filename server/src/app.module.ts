import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { FileModule } from './file/file.module';
import { File } from './file/file.entity';

// import { UsersModule } from './user/users.module';
// import { User } from './user';


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
          port: config.get('POSTGRES_PORT'),
          username: config.get('POSTGRES_USERNAME'),
          password: config.get('POSTGRES_PASSWORD'),
          database: config.get('POSTGRES_DATABASE'),
          entities: [File],
          synchronize: true,
          useUnifiedTopology: false,
          
        } as PostgresConnectionOptions;
        
      },
    }),
    FileModule,
  ],
})
export class AppModule {}


