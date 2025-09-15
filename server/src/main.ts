import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './AllExceptionsFilter';
import * as compression from "compression" 
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    stopAtFirstError: true,
  }))
  app.useGlobalFilters(new AllExceptionsFilter())
  
  // for parse Cookies
  app.use(cookieParser())

  // compression response body
  app.use(compression())
  
  // core config
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
 
  // Rate Limiting 
  
  await app.listen(process.env.PORT ?? 8000);


}
bootstrap();
