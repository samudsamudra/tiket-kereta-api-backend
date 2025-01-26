import { Logger, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AppModule],
})
export class BootstrapModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply((req, res, next) => {
      Logger.log(`Endpoint: ${req.method} ${req.url}`);
      next();
    }).forRoutes('*');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(new Logger());

  console.log('APP_KEY:', configService.get<string>('APP_KEY')); // Hanya untuk debug!
  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
