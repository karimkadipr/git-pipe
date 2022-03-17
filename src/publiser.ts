import { exit } from 'process';
// import GitService, { IRepublishParams } from './features/git/git.service';

export const publisher = async () => {
  
  let rawdata: any = require(process.env.TRIGGER_PAYLOAD);
  let webhook_event = JSON.parse(rawdata);
  // const args = ['', '', '', '']
  // let request: IRepublishParams;

  // if (args.length !== 3)
  //   request = {
  //     gitDevRepos:
  //       '',
  //     developBranch: '',
  //     gitMasterRepos: '',
  //     masterBranch: '',
  //   };
  // else
  //   request = {
  //     gitDevRepos: args[0],
  //     developBranch: args[1],
  //     gitMasterRepos: args[2],
  //     masterBranch: args[3],
  //   };

  // await GitService.republish(request);
  console.log("🚀 ~ file: publiser.ts ~ line 25 ~ publisher ~ This means all good from instalattion to variables", {webhook_event})
  
  exit();
};

publisher();
