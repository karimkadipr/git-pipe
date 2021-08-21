import { IsNumber } from 'class-validator';
import Trans from '../translations';

const IsCustomNumber: Function = () =>
  IsNumber(
    {},
    {
      message: (target) => {
        return JSON.stringify({
          en: ` ${
            Trans.en[target.property] || target.property
          } must be a number`,
          fr: ` ${
            Trans.fr[target.property] || target.property
          } doit être un nombre`,
        });
      },
    },
  );

export default IsCustomNumber;
