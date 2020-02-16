import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatsModule } from './cats/cats.module';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { FileModule } from './file/file.module';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';

@Module({
  imports: [
    PhotoModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {

        return {
          type: "mongodb",          
          database: config.get('MONGO_INITDB_DATABASE'),
          entities: [Photo],
          synchronize: false,
          useUnifiedTopology: true,
          
        } as MongoConnectionOptions;
        
      },
    })
  ],
})
export class AppModule {}


