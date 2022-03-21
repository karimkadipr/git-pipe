import { exit } from 'process';
import GitService, { IRepublishParams } from './features/git/git.service';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const publisher = async (data) => {
  let request: IRepublishParams;

  request = {
    gitDevRepos: data.project.git_ssh_url,
    developBranch: data.variables.source_branch,
    gitMasterRepos: data.variables.target_git_ssh_url,
    masterBranch: data.variables.target_branch,
    skip: true,
  };
  console.log('🚀 ~ file: publiser.ts ~ line 19 ~ publisher ~ request', {
    request,
  });

  await GitService.republish(request);
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
