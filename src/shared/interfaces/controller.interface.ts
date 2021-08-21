import { Router } from 'express';

export default interface Controller {
  path: string;
  isPublic?: boolean | null | undefined;
  route: Router;
  initializeRoutes(): void;
}
