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
        fmt(() => _console.debug(...args), ...args);
    };

    console.error = (...args) => {
        fmt(() => _console.error(...args), ...args);
    };

    console.info = (...args) => {
        fmt(() => _console.info(...args), ...args);
    };

    console.log = (...args) => {
        fmt(() => _console.info(...args), ...args);
    };

    console.trace = (...args) => {
        fmt(() => _console.trace(...args), ...args);
    };

    console.warn = (...args) => {
        fmt(() => _console.warn(...args), ...args);
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

function fmt(executor: any, ...args: any[]) {
    return args?.length === 1
        ? executor({ msg: args[0] })
        : executor(...args)
}
