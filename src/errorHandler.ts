import { Request, Response, NextFunction } from 'express';
import Exception from './utils/Exception';

function globalErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof Exception) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({
      message,
    });
  }
}

export default globalErrorHandler;
