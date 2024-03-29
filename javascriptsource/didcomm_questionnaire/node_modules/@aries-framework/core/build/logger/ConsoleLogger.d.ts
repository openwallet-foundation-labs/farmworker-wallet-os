import { BaseLogger } from './BaseLogger';
export declare class ConsoleLogger extends BaseLogger {
    private consoleLogMap;
    private log;
    test(message: string, data?: Record<string, any>): void;
    trace(message: string, data?: Record<string, any>): void;
    debug(message: string, data?: Record<string, any>): void;
    info(message: string, data?: Record<string, any>): void;
    warn(message: string, data?: Record<string, any>): void;
    error(message: string, data?: Record<string, any>): void;
    fatal(message: string, data?: Record<string, any>): void;
}
