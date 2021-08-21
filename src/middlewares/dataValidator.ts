import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
const autoParse = require('auto-parse');

import HttpException from '../exceptions/httpException';
import { HttpStatusEnum } from '../shared';

function validationMiddleware<T>(type: any): express.RequestHandler {
  return async (req, res, next): Promise<void> => {
    
    let { body } = req;
    if (req.is('multipart/form-data')) {
      body = autoParse(body);
    }

    const errors: ValidationError[] = await validate(plainToClass(type, body));
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => {
          if (error.constraints) {
            return Object.values(error.constraints);
          } else {
            return (error.children || [])
              .map((childError: ValidationError) => {
                return Object.values(childError.constraints as any);
              })
              .join(', ');
          }
        })
        .join(', ');
      next(new HttpException(HttpStatusEnum.BAD_REQUEST, message));
    } else {
      next();
    }
  };
}

export default validationMiddleware;
