import { MinLength } from 'class-validator';
import Trans from '../translations';

const CustomMinLength: Function = (number: number) =>
  MinLength(number, {
    message: (target) => {
      return JSON.stringify({
        en: ` ${
          Trans.en[target.property] || target.property
        } must be longer than or equal to ${number} characters`,
        fr: ` ${
          Trans.fr[target.property] || target.property
        } doit être supérieur ou égal à ${number} caractères`,
      });
    },
  });

export default CustomMinLength;
