import { echo } from 'shelljs';
import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const publisher = async (data) => {
  let request: IRepublishParams;

  // tmp: to connect my account .replace("gitlab.com", "gitlab-work")
  // please use data.project.git_ssh_url & data.variables.target_git_ssh_url
  // in the request object instead.

  const sourceGitRepo = data.project.git_ssh_url;
  const targetGitRepo = data.variables.target_git_ssh_url;

  const authorizedSourceGitRepo = sourceGitRepo.replace(
    'gitlab.com',
    'gitlab-work',
  );
  const authorizedTargetGitRepo = targetGitRepo.replace(
    'gitlab.com',
    'gitlab-work',
  );

  const allowedToPush = data.event_type === 'merge_request'; /* && */
  // data.object_attributes.state === 'opened' &&
  // data.user.username === 'amine.ballalou' &&
  // data.object_attributes.action === 'approved';

  /**
     *  &&
    data.object_attributes.state trigger merged opened
     */
  request = {
    gitDevRepos: sourceGitRepo, // REPLACE THE VALUE WITH: data.project.git_ssh_url
    developBranch: data.variables.source_branch,
    developBranchBase: data.variables.source_base_branch,
    gitMasterRepos: targetGitRepo, // target repo ssh_url. / REPLACE THE VALUE WITH: data.variables.target_git_ssh_url
    masterBranch: data.variables.target_branch, // target branch to push to.
  };

  console.log(
    '✨ 🤙 ~ publisher ~ Request ~ Run Job under this Configuration: ',
    request,
  );

  if (allowedToPush) {
    await GitService.republish(request);
  } else
    echo(
      `❌ 🚀 Not Allowed to run this JOB. Merge Request Status: ${data.object_attributes.state}`,
    );
  exit();
};

/* let file = process.env.TRIGGER_PAYLOAD || '';
let rawdata = fs.readFileSync(file, {
  encoding: 'utf8',
});

let webhook_event = JSON.parse(rawdata); */

const web_event = {
  event_type: 'merge_request',
  variables: {
    target_git_ssh_url: 'https://gitlab.com/kadikarimpr/targetrepo',
    source_branch: 'develop',
    source_base_branch: 'main',
    target_branch: 'main',
  },
  project: {
    git_ssh_url: 'https://gitlab.com/kadikarimpr/sourcerepo.git',
  },
};

publisher(web_event);
