import { IsNotEmpty } from 'class-validator';
import Trans from '../translations';

const IsRequired: Function = () =>
  IsNotEmpty({
    message: (target) => {
      return JSON.stringify({
        en: ` ${
          Trans.en[target.property] || target.property
        } should not be empty`,
        fr: ` ${
          Trans.fr[target.property] || target.property
        } ne doit pas être vide`,
      });
    },
  });

export default IsRequired;
