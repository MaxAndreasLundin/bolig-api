import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function createNestApp(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: ['https://bolig-web.vercel.app', 'http://localhost:3333'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  return app.init();
}

const server = express();

createNestApp(server);

if (process.env.VERCEL) {
  module.exports = (req: VercelRequest, res: VercelResponse) => {
    server(req, res);
  };
} else {
  server.listen(parseInt(process.env.PORT ?? '3000'), () => {
    console.log(`Server is running on port ${process.env.PORT ?? '3000'}`);
  });
}
