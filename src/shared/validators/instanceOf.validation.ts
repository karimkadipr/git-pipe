/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  registerDecorator,
  ValidationOptions,
  ValidationError,
  validate,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import HttpException from '../../exceptions/httpException';
import { HttpStatusEnum } from '../Enums/httpStatus.enum';
import AddressDTO from '../../features/address/address.dto';

export function InstanceOf(
  typeObj: any,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'InstanceOf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const valueObj = value || {};

          const errors: ValidationError[] = await validate(
            plainToClass(typeObj, valueObj),
          );

          if (errors.length !== 0) {
            const message = errors
              .map((error: ValidationError) =>
                Object.values(error.constraints as any),
              )
              .join(', ');

            return Promise.reject(
              new HttpException(HttpStatusEnum.BAD_REQUEST, message),
            );
          }

          return errors.length === 0;
        },
      },
    });
  };
}

const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export default InstanceOf;
