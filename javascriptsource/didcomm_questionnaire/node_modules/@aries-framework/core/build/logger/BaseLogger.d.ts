import type { Logger } from './Logger';
import { LogLevel } from './Logger';
export declare abstract class BaseLogger implements Logger {
    logLevel: LogLevel;
    constructor(logLevel?: LogLevel);
    isEnabled(logLevel: LogLevel): boolean;
    abstract test(message: string, data?: Record<string, any>): void;
    abstract trace(message: string, data?: Record<string, any>): void;
    abstract debug(message: string, data?: Record<string, any>): void;
    abstract info(message: string, data?: Record<string, any>): void;
    abstract warn(message: string, data?: Record<string, any>): void;
    abstract error(message: string, data?: Record<string, any>): void;
    abstract fatal(message: string, data?: Record<string, any>): void;
}
