"use strict";

/**
 * Centralized logging utility for React Native Biometrics
 * Provides structured logging with different levels and optional debug mode
 */

export let LogLevel = /*#__PURE__*/function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["INFO"] = 1] = "INFO";
  LogLevel[LogLevel["WARN"] = 2] = "WARN";
  LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
  LogLevel[LogLevel["NONE"] = 4] = "NONE";
  return LogLevel;
}({});
class BiometricLogger {
  config = {
    enabled: false,
    level: LogLevel.INFO,
    prefix: '[ReactNativeBiometrics]',
    includeTimestamp: true,
    includeContext: true,
    useColors: true
  };
  logs = [];
  maxLogEntries = 100;

  /**
   * Configure the logger settings
   */
  configure(config) {
    this.config = {
      ...this.config,
      ...config
    };
  }

  /**
   * Enable or disable logging
   */
  setEnabled(enabled) {
    this.config.enabled = enabled;
  }

  /**
   * Set the minimum log level
   */
  setLevel(level) {
    this.config.level = level;
  }

  /**
   * Log a debug message
   */
  debug(message, context, data) {
    this.log(LogLevel.DEBUG, message, context, data);
  }

  /**
   * Log an info message
   */
  info(message, context, data) {
    this.log(LogLevel.INFO, message, context, data);
  }

  /**
   * Log a warning message
   */
  warn(message, context, data) {
    this.log(LogLevel.WARN, message, context, data);
  }

  /**
   * Log an error message
   */
  error(message, context, error, data) {
    this.log(LogLevel.ERROR, message, context, data, error);
  }

  /**
   * Internal logging method
   */
  log(level, message, context, data, error) {
    if (!this.config.enabled || level < this.config.level) {
      return;
    }
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      context,
      data,
      error
    };

    // Store log entry
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogEntries) {
      this.logs.shift();
    }

    // Format and output to console
    this.outputToConsole(logEntry);
  }

  /**
   * ANSI color codes for console output
   */
  colors = {
    reset: '\x1b[0m',
    gray: '\x1b[90m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    dim: '\x1b[2m'
  };

  /**
   * Get color for log level
   */
  getColorForLevel(level) {
    if (!this.config.useColors) {
      return '';
    }
    switch (level) {
      case LogLevel.DEBUG:
        return this.colors.gray;
      case LogLevel.INFO:
        return this.colors.blue;
      case LogLevel.WARN:
        return this.colors.yellow;
      case LogLevel.ERROR:
        return this.colors.red;
      default:
        return '';
    }
  }

  /**
   * Apply color formatting to text
   */
  colorize(text, color) {
    if (!this.config.useColors || !color) {
      return text;
    }
    return `${color}${text}${this.colors.reset}`;
  }

  /**
   * Output log entry to console
   */
  outputToConsole(entry) {
    const parts = [];
    const levelColor = this.getColorForLevel(entry.level);

    // Add prefix with cyan color
    parts.push(this.colorize(this.config.prefix, this.colors.cyan));

    // Add timestamp with dim color
    if (this.config.includeTimestamp) {
      const timestamp = `[${entry.timestamp}]`;
      parts.push(this.colorize(timestamp, this.colors.dim));
    }

    // Add level with appropriate color
    const levelText = `[${LogLevel[entry.level]}]`;
    parts.push(this.colorize(levelText, levelColor));

    // Add context with dim color
    if (this.config.includeContext && entry.context) {
      const contextText = `[${entry.context}]`;
      parts.push(this.colorize(contextText, this.colors.dim));
    }

    // Add message with level color
    parts.push(this.colorize(entry.message, levelColor));
    const logMessage = parts.join(' ');

    // Output based on level
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(logMessage, entry.data);
        break;
      case LogLevel.INFO:
        console.info(logMessage, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, entry.data);
        break;
      case LogLevel.ERROR:
        console.error(logMessage, entry.data, entry.error);
        break;
    }
  }

  /**
   * Get all stored log entries
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Get logs filtered by level
   */
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Get logs filtered by context
   */
  getLogsByContext(context) {
    return this.logs.filter(log => log.context === context);
  }

  /**
   * Clear all stored logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Get current logger configuration
   */
  getConfig() {
    return {
      ...this.config
    };
  }
}

// Export singleton instance
export const logger = new BiometricLogger();

// Export convenience functions
export const enableLogging = (enabled = true) => logger.setEnabled(enabled);
export const setLogLevel = level => logger.setLevel(level);
export const configureLogger = config => logger.configure(config);

// Export default logger instance
export default logger;
//# sourceMappingURL=logger.js.map