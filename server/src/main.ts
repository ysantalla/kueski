import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // somewhere in your initialization file
  app.use(helmet());

  // somewhere in your initialization file
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Kueski example')
    .setDescription('The kueski API description')
    .setVersion('1.0')
    .addTag('kuski')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
