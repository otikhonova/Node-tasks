import { Request, Response, NextFunction } from 'express';
import Exception from './utils/Exception';

function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err instanceof Exception ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
  });
}

export default globalErrorHandler;