import { echo } from 'shelljs';
import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const publisher = async (data) => {
  let request: IRepublishParams;

  // tmp related to my account .replace("gitlab.com", "gitlab-work")
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
    data.object_attributes.state === 'merged';

  request = {
    gitDevRepos: authorizedSourceGitRepo,
    developBranch: data.variables.source_branch,
    gitMasterRepos: authorizedTargetGitRepo,
    masterBranch: data.variables.target_branch,
    commits: data.commits,
  };
  console.log('🚀 ~ file: publiser.ts ~ line 19 ~ publisher ~ request', {
    request,
  });

  if (allowedToPush) await GitService.republish(request);
  echo('🚀 ✅ Everything up to date.');
  exit();
};

let file = process.env.TRIGGER_PAYLOAD || '';
let rawdata = fs.readFileSync(file, {
  encoding: 'utf8',
});

let webhook_event = JSON.parse(rawdata);
console.log('🚀 ~ file: publiser.ts ~ line 75 ~ webhook_event', {
  webhook_event,
});

publisher(webhook_event);
