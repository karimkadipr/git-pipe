import { IsNotEmpty, IsUrl } from 'class-validator';
import Trans from '../translations';
import config from 'config';

const serverConfig: any = config.get('server');
const cloudStorageHost: string = config.get('cloudStorageHost');

const IsLocalImageValidURL: Function = () =>
  IsUrl(
    {
      require_host: true,
      host_whitelist: [serverConfig.host, cloudStorageHost],
    },
    {
      message: (target) => {
        return JSON.stringify({
          en: ` ${
            Trans.en[target.property] || target.property
          } must be a valid image URL`,
          fr: ` ${
            Trans.fr[target.property] || target.property
          } doit être une URL d'image valide`,
        });
      },
    },
  );

export default IsLocalImageValidURL;
