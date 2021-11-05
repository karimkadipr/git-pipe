import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';

export const publisher = async () => {
  const args = process.argv.slice(2);
  let request: IRepublishParams;

  if (args.length !== 3)
    request = {
      gitDevRepos:
        'https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish',
      developBranch: 'develop',
      gitMasterRepos: 'git@github.com:react-one/git-republisher.git',
      masterBranch: 'clone-master',
    };
  else
    request = {
      gitDevRepos: args[0],
      developBranch: args[1],
      gitMasterRepos: args[2],
      masterBranch: args[3],
    };

  await GitService.republish(request);
  exit();
};

publisher();
