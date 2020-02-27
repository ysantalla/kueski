import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { CommonModule } from './commons/common.module';
import { FileModule } from './file/file.module';

// import { File } from './file/file.entity';
// import { FileModule } from './file/file.module';

// import { User } from './user/user.entity';
// import { UserModule } from './user/user.module';
// import { config } from 'rxjs';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
        imports: [
          ConfigModule
        ],
        inject: [
          ConfigService
        ],
        useFactory: async (config: ConfigService)  => {
          return {
            uri: `mongodb://localhost:27017/${config.get('MONGO_INITDB_DATABASE')}`,
            useNewUrlParser: true,
            useUnifiedTopology: true
          } as MongooseModuleOptions;
        }

      }
    ),    
    CommonModule,
    FileModule,
    // UserModule
  ],
})
export class AppModule {}
