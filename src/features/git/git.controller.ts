import { Router, Request, Response } from 'express';
import { Controller, HttpStatusEnum } from '../../shared';
import GitService from './git.service';

class GitController implements Controller {
  path = '/git';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.get('/list-commits', this.listAllCommits);
  }

  async listAllCommits(req: Request, res: Response): Promise<void> {
    res.status(HttpStatusEnum.SUCCESS).send([" OK ! "]);
  }
}

export default GitController;
