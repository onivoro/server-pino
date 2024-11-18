import { RouteInfo, Type } from "@nestjs/common/interfaces";
import { randomUUID } from "crypto";
import { Params } from "nestjs-pino";
import { IncomingMessage, ServerResponse } from "node:http";
import { DestinationStream } from "pino";
import { Options } from "pino-http";

export const apiIdHeader = 'x-api-id';
export const apiKeyHeader = 'x-api-key';

export class ServerPinoConfig implements Params {
  exclude?: (string | RouteInfo)[] | undefined;
  pinoHttp?: Options<IncomingMessage, ServerResponse<IncomingMessage>, never> | DestinationStream | [Options<IncomingMessage, ServerResponse<IncomingMessage>, never>, DestinationStream] | undefined;
  forRoutes?: (string | RouteInfo | Type<any>)[] | undefined;
  renameContext?: string | undefined;
  useExisting?: true | undefined;

  constructor(overrides?: Partial<Params>) {
    const defaultValues = ServerPinoConfig.getDefaultParams();

    Object.entries({ ...defaultValues, ...(overrides || {}) }).forEach(([key, value]) => {
      (this as any)[key] = value;
    });
  }

  static getDefaultParams(): Params {
    return {
      pinoHttp: {
        autoLogging: false,
        genReqId: () => randomUUID(),
        redact: ['req.headers.authorization', `req.headers["${apiIdHeader}"]`, `req.headers["${apiKeyHeader}"]`, `req.headers["cookie"]`],
        useLevel: 'info',
        transport: undefined,
      }
    };
  }
}
