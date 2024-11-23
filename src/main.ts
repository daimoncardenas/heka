import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors(); //? Enable Cors

  //? Global Pipes

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //? Configuration of Swagger

  const config = new DocumentBuilder()
    .setTitle('API HEKA TESTING') //? Tittle
    .setDescription('Elaborado por Daimon Cardenas') //? Description
    .setVersion('1.0') //? Version
    .addBearerAuth() //? Autentications with Bearer
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);



  await app.listen(3000);
}
bootstrap();
