import { Router, Request, Response } from 'express';
import { Controller, HttpStatusEnum } from '../../shared';
import GitService, { IRepublishParams } from './git.service';

class GitController implements Controller {
  path = '/git';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    // this.route.get('/publisher', this.publisher);
    // this.route.get('/test', this.test);
  }

  async publisher(req: Request, res: Response): Promise<void> {

    const request: IRepublishParams = {
      gitDevRepos:
        'https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish',
      developBranch: 'develop',
      gitMasterRepos: 'git@github.com:react-one/git-republisher.git',
      masterBranch: 'clone-master',
    };

    await GitService.republish(request);

    res.status(HttpStatusEnum.SUCCESS).send([' OK ! ']);
  }
}

export default GitController;
