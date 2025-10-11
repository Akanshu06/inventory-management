import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object(schema).validate({
      body: req.body,
      params: req.params,
      query: req.query,
    }, { abortEarly: false, allowUnknown: true });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    }

    next();
  };
};