/**
 * Centralized logging utility for React Native Biometrics
 * Provides structured logging with different levels and optional debug mode
 */
export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: string;
    data?: any;
    error?: Error;
}
export interface LoggerConfig {
    enabled: boolean;
    level: LogLevel;
    prefix: string;
    includeTimestamp: boolean;
    includeContext: boolean;
    useColors: boolean;
}
declare class BiometricLogger {
    private config;
    private logs;
    private maxLogEntries;
    /**
     * Configure the logger settings
     */
    configure(config: Partial<LoggerConfig>): void;
    /**
     * Enable or disable logging
     */
    setEnabled(enabled: boolean): void;
    /**
     * Set the minimum log level
     */
    setLevel(level: LogLevel): void;
    /**
     * Log a debug message
     */
    debug(message: string, context?: string, data?: any): void;
    /**
     * Log an info message
     */
    info(message: string, context?: string, data?: any): void;
    /**
     * Log a warning message
     */
    warn(message: string, context?: string, data?: any): void;
    /**
     * Log an error message
     */
    error(message: string, context?: string, error?: Error, data?: any): void;
    /**
     * Internal logging method
     */
    private log;
    /**
     * ANSI color codes for console output
     */
    private colors;
    /**
     * Get color for log level
     */
    private getColorForLevel;
    /**
     * Apply color formatting to text
     */
    private colorize;
    /**
     * Output log entry to console
     */
    private outputToConsole;
    /**
     * Get all stored log entries
     */
    getLogs(): LogEntry[];
    /**
     * Get logs filtered by level
     */
    getLogsByLevel(level: LogLevel): LogEntry[];
    /**
     * Get logs filtered by context
     */
    getLogsByContext(context: string): LogEntry[];
    /**
     * Clear all stored logs
     */
    clearLogs(): void;
    /**
     * Get current logger configuration
     */
    getConfig(): LoggerConfig;
}
export declare const logger: BiometricLogger;
export declare const enableLogging: (enabled?: boolean) => void;
export declare const setLogLevel: (level: LogLevel) => void;
export declare const configureLogger: (config: Partial<LoggerConfig>) => void;
export default logger;
//# sourceMappingURL=logger.d.ts.map