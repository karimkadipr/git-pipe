import { IsEnum } from 'class-validator';
import Trans from '../translations';

const IsCustomEnum: Function = (entity: any) => {
  return IsEnum(entity, {
    message: (target: { property: string | number }) => {
      return JSON.stringify({
        en: ` ${
          Trans.en[target.property] || target.property
        } must be a valid enum value`,
        fr: ` ${
          Trans.fr[target.property] || target.property
        } doit être une valeur d'énum valide`,
      });
    },
  });
};

export default IsCustomEnum;
