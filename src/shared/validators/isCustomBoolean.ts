import { IsBoolean } from 'class-validator';
import Trans from '../translations';

const IsCustomBoolean: Function = () =>
  IsBoolean({
    message: (target) => {
      return JSON.stringify({
        en: ` ${
          Trans.en[target.property] || target.property
        } must be a boolean value`,
        fr: ` ${
          Trans.fr[target.property] || target.property
        } doit être une valeur booléenne`,
      });
    },
  });

export default IsCustomBoolean;
