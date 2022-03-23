import { echo } from 'shelljs';
import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const publisher = async (data) => {
  let request: IRepublishParams;

  // tmp connect to my account .replace("gitlab.com", "gitlab-work")
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

  const allowedToPush =
    data.event_type === 'merge_request' &&
    data.object_attributes.state === 'opened';

  /**
     *  &&
    data.object_attributes.action === 'approved' &&
    data.user.username === 'Kitani_Islam' 
    data.object_attributes.state trigger merged opened
     */
  request = {
    gitDevRepos: authorizedSourceGitRepo,
    developBranch: data.variables.source_branch,
    developBranchBase: data.variables.source_base_branch,
    gitMasterRepos: authorizedTargetGitRepo,
    masterBranch: data.variables.target_branch,
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

let file = process.env.TRIGGER_PAYLOAD || '';
let rawdata = fs.readFileSync(file, {
  encoding: 'utf8',
});

let webhook_event = JSON.parse(rawdata);

publisher(webhook_event);
