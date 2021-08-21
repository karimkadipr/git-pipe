import { Express } from 'express';
import GitController from '../features/git';
import { Controller } from '../shared';

const URL_PREFIX = '/api/v1';

export default (app: Express): void => {
  const controllers: Controller[] = [
    new GitController()
  ];

  controllers.forEach((controller) => {
    app.use(
      URL_PREFIX + controller.path,
      controller.route,
    );
  });
};
