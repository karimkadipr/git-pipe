import { IsArray } from 'class-validator';
import Trans from '../translations';

const IsCustomArray: Function = () =>
  IsArray({
    message: (target) => {
      return JSON.stringify({
        en: ` ${Trans.en[target.property] || target.property} must be an array`,
        fr: ` ${
          Trans.fr[target.property] || target.property
        } doit être un tableau`,
      });
    },
  });

export default IsCustomArray;
