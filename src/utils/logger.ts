import { createLogger, format, transports } from 'winston';

/**
 * Instancia de logger Winston con color, timestamp y salida a consola.
 * El nivel se controla vía `LOG_LEVEL` (default `debug`).
 */
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, ...meta }) => {
            const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
            return `${timestamp} ${level}: ${message}${metaStr}`;
        })
    ),
    transports: [new transports.Console()]
});

export default logger;