import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

const validateRequest = (schema: Schema) => (req: Request, res: Response, next: NextFunction): void => {
  const { error } = schema.validate(req.body || req.query);
  
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  next();
};

export default validateRequest;
