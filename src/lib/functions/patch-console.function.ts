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
        _console.debug({msg: args});
        // fmt(() => _console.debug(...args), ...args);
    };

    console.error = (...args) => {
        _console.error({msg: args});
        // fmt(() => _console.error(...args), ...args);
    };

    console.info = (...args) => {
        _console.info({msg: args});
        // fmt(() => _console.info(...args), ...args);
    };

    console.log = (...args) => {
        _console.info({msg: args});
        // fmt(() => _console.info(...args), ...args);
    };

    console.trace = (...args) => {
        _console.trace({msg: args});
        // fmt(() => _console.trace(...args), ...args);
    };

    console.warn = (...args) => {
        _console.warn({msg: args});
        // fmt(() => _console.warn(...args), ...args);
    };

    return {
        _console,
        restore: () => {
            Object.entries(original).forEach(([method, implementation]) => {
                (console as any)[method] = implementation;
            });
        }
    };


function fmt(executor: any, ...args: any[]) {
    // process.stdout.write(JSON.stringify(args, null, 2));
    return args?.length === 2
        ? executor({ msg: args[0] })
        : executor(...args)
}

}
