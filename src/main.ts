import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";
import {RpcServerService} from "./rpc/server/rpc-server.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger()
  });
  let server = app.get<RpcServerService>(RpcServerService);
  server.startServer();
  await app.listen(3000);
}
bootstrap();
