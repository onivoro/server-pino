import { Logger, PinoLogger } from 'nestjs-pino';

export function patchConsole(logger: PinoLogger) {
    const _console = logger;

    const original = {
        debug: console.debug,
        error: console.error,
        info: console.info,
        log: console.log,
        trace: console.trace,
        warn: console.warn,
    };

    console.debug = (...args: any[]) => {
        _console.debug(fmt(...args));
    };

    console.error = (...args: any[]) => {
        _console.error(fmt(...args));
    };

    console.info = (...args: any[]) => {
        _console.info(fmt(...args));
    };

    console.log = (...args: any[]) => {
        _console.info(fmt(...args)); // what should this be? which is higher level?
    };

    console.trace = (...args: any[]) => {
        _console.trace(fmt(...args));
    };

    console.warn = (...args: any[]) => {
        _console.warn(fmt(...args));
    };

    return {
        _console,
        restore: () => {
            Object.entries(original).forEach(([method, implementation]) => {
                (console as any)[method] = implementation;
            });
        }
    };
}

function fmt(...args: any[]): any[] {
    return args?.length === 1 ? [{ "msg": args[0] }] as any[] : args;
}
