import { Router, Request, Response } from 'express';
import { Controller, HttpStatusEnum } from '../../shared';
import { overwriteFolderContent } from '../../utils/fileManager';
import GitService, { IRepublishParams } from './git.service';

class GitController implements Controller {
  path = '/git';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.get('/publisher', this.publisher);
    this.route.get('/test', this.test);
  }

  async test(req: Request, res: Response): Promise<void> {

    overwriteFolderContent(
      "/Users/admin/dev/Git-republisher/Republiser/temp/republisher-674/develop-543"
      ,
      "/Users/admin/dev/Git-republisher/Republiser/temp/republisher-674/master-504"
    )

    res.status(HttpStatusEnum.SUCCESS).send([" OK ! "]);
  }


  async publisher(req: Request, res: Response): Promise<void> {

    const request: IRepublishParams = {
      gitRepos: "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish",
      masterBranch: "clone-master",
      developBranch: "develop",
    }

    await GitService.republish(request)

    res.status(HttpStatusEnum.SUCCESS).send([" OK ! "]);

  }
}

export default GitController;
