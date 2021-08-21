import { IsEmail } from 'class-validator';
import Trans from '../translations';

const IsCustomEmail: Function = () =>
  IsEmail(
    {},
    {
      message: (target) => {
        return JSON.stringify({
          en: ` ${
            Trans.en[target.property] || target.property
          } must be a valid email`,
          fr: ` ${
            Trans.fr[target.property] || target.property
          } doit être un email`,
        });
      },
    },
  );

export default IsCustomEmail;
