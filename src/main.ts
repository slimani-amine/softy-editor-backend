import 'dotenv/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import {
  restResponseTimeHistogram,
  startMetricsServer,
<<<<<<< HEAD
} from './metrics/metrics.service';
import responseTime from 'response-time';
import { Request, Response } from 'express';
=======
} from './utils/metrics/metrics.service';
>>>>>>> f9da070ebe74470d8dd4da41d64056da3213d4c9

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableShutdownHooks();
  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

<<<<<<< HEAD
  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode,
          },
          time * 1000,
        );
      }
    }),
  );

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
=======
  app.use((req, res, next) => {
    req['startTime'] = process.hrtime();
    next();
  });

  app.use((req, res, next) => {
    res.once('finish', () => {
      const diff = process.hrtime(req['startTime']);
      const time = diff[0] * 1e3 + diff[1] * 1e-6; 
      if (req.url) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.url,
            status_code: res.statusCode,
          },
          time,
        );
      }
    });
    next();
  });

  await app.listen(
    configService.getOrThrow('app.port', { infer: true }),
    '0.0.0.0',
  );
>>>>>>> f9da070ebe74470d8dd4da41d64056da3213d4c9
  startMetricsServer();
}
void bootstrap();
