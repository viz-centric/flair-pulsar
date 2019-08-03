import {Global, Injectable} from '@nestjs/common';
import * as winston from "winston";

@Global()
@Injectable()
export class LoggingService {
  private static lg: winston.Logger;

  constructor() {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.simple(),
      defaultMeta: { },
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/log.log' })
      ]
    });

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console());
    }
    LoggingService.lg = logger;
  }

  static msg(...args) {
    LoggingService.lg.info.apply(null, args);
  }
}

export const msg = LoggingService.msg;
