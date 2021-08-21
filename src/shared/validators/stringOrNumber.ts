import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import Trans from '../translations';

@ValidatorConstraint({ async: false })
export default class StringOrNumber implements ValidatorConstraintInterface {
  validate(text: string, _args: ValidationArguments) {
    return typeof text === 'string' || typeof text === 'number';
  }

  defaultMessage(args: ValidationArguments) {
    return JSON.stringify({
      en: ` ${
        Trans.en[args.property] || args.property
      } must be a string or a number`,
      fr: ` ${
        Trans.fr[args.property] || args.property
      } doit être une chaine de caractère ou un nombre`,
    });
  }
}
