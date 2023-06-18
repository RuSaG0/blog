import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('blog docs')
      .setVersion('1.0.0')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  // TODO
  const corsOptions: CorsOptions = {
    origin: true, // Allow requests from all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  // Enable CORS
  app.enableCors(corsOptions);

  app.use(cookieParser());

  try {
    const port = process.env.PORT || 5000
    await app.listen(port);
    console.info(`Server started on port ${port}`)
  }

  catch (e) {
    throw new Error('Cant start app')
  }

}

bootstrap();