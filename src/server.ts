import config from 'config';
import app from './app';

const serverConfig: any = config.get('server');

app.listen(process.env.PORT || serverConfig.port, () => {
  console.info(`Listening on port ${process.env.PORT || serverConfig.port}`);
});
