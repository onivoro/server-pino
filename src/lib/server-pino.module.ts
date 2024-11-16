import { Module } from '@nestjs/common';
import { ServerPinoConfig } from './classes/server-pino-config.class';
import { moduleFactory } from '@onivoro/server-common';

@Module({})
export class ServerPinoModule {
  static configure(config: ServerPinoConfig) {
    return moduleFactory({
      module: ServerPinoModule,
      providers: [
        { provide: ServerPinoConfig, useValue: config },
      ]
    });
  }
}
