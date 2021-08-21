import { IsUrl } from 'class-validator';
import Trans from '../translations';

const IsUrlCustom: Function = () =>
  IsUrl(
    {},
    {
      message: (target) => {
        return JSON.stringify({
          en: ` ${
            Trans.en[target.property] || target.property
          } must be an URL address`,
          fr: ` ${
            Trans.fr[target.property] || target.property
          } doit être une adresse URL`,
        });
      },
    },
  );

export default IsUrlCustom;
