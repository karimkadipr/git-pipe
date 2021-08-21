import { IsString } from 'class-validator';
import Trans from "../translations";

const IsCustomString: Function = () =>
  IsString({
    message: (target) => {
      return JSON.stringify({
        en: ` ${Trans.en[target.property] || target.property} must be a string`,
        fr: ` ${Trans.fr[target.property] || target.property} doit être une chaine de caractère`,
      });
    },
  });

export default IsCustomString;