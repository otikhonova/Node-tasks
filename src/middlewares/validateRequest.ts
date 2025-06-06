import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

const validateRequest =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate =
      req.body && Object.keys(req.body).length > 0 ? req.body : req.query;
    const { error } = schema.validate(dataToValidate);
  
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  next();
};

export default validateRequest;
