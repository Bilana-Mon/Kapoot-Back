import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  app.enableCors({
    origin: ['https://kapoot.app', 'https://api.kapoot.app'],
  });
  await app.listen(port);
}

bootstrap();

