import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter: any = app.getHttpAdapter();
  httpAdapter.set('etag', false);
  const config = new DocumentBuilder()
    .setTitle('Trade time')
    .setDescription('Documentation of REST api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`App has been started on ${PORT} port`),
  );
}
bootstrap();
