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

    console.debug = (...args) => {
        _console.debug(...args);
    };

    console.error = (...args) => {
        _console.error(...args);
    };

    console.info = (...args) => {
        _console.debug(...args);
    };

    console.log = (...args) => {
        _console.debug(...args); // what should this be? which is higher level?
    };

    console.trace = (...args) => {
        _console.trace(...args);
    };

    console.warn = (...args) => {
        _console.warn(...args);
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
