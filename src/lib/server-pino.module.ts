import { Module } from '@nestjs/common';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { ServerPinoConfig } from './classes/server-pino-config.class';
import { moduleFactory } from '@onivoro/server-common';
import { patchConsole } from './functions/patch-console.function';

@Module({})
export class ServerPinoModule {
  static configure(config: ServerPinoConfig, patchConsoleInstance = false) {

    if(patchConsoleInstance) {
      patchConsole(new PinoLogger(config))
    }

    return moduleFactory({
      module: ServerPinoModule,
      imports: [LoggerModule.forRoot(config)],
      providers: [
        { provide: ServerPinoConfig, useValue: config },
        // { provide: Logger, useFactory: (logger: PinoLogger) => logger, inject: [PinoLogger] }
      ]
    });
  }
}

