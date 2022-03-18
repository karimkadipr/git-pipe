import { exit } from 'process';
// import GitService, { IRepublishParams } from './features/git/git.service';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

export const publisher = async (data) => {
  // try {
  // fs.readFile(path.join(__dirname, process.env.TRIGGER_PAYLOAD, 'utf8', (error, data) => {
  //   let webhook_event: string = JSON.parse(data);
  //   console.log("🚀 ~ file: publiser.ts ~ line 25 ~ publisher ~ This means all good from instalattion to variables", {webhook_event})

  //   exit();
  // })} catch (error) {
  //   console.log(error)
  // }

  console.log(
    '🚀 ~ file: publiser.ts ~ line 25 ~ publisher ~ This means all good from instalattion to variables',
    {
      git_ssh_url: `${data.project.git_ssh_url}`,
      default_branch: `${data.project.default_branch}`,
    },
  );
  exit();
  // try {
  //   let rawdata = fs.readFileSync(process.env.TRIGGER_PAYLOAD, {
  //     encoding: 'utf8',
  //   });

  //   let webhook_event = JSON.parse(rawdata);
  //   console.log(
  //     '🚀 ~ file: publiser.ts ~ line 25 ~ publisher ~ This means all good from instalattion to variables',
  //     { webhook_event },
  //   );

  //   exit();
  //   //   fs.readFile(path.join(__dirname, process.env.TRIGGER_PAYLOAD, 'utf8', (error, data) => {
  //   // })
  // } catch (error) {
  //   console.log(error);
  // }

  // let rawdata = fs.readFileSync(process.env.TRIGGER_PAYLOAD);
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
  // console.log("🚀 ~ file: publiser.ts ~ line 25 ~ publisher ~ This means all good from instalattion to variables", {webhook_event})

  // exit();
};
let file = process.env.TRIGGER_PAYLOAD || '';
let rawdata = fs.readFileSync(file, {
  encoding: 'utf8',
});

let webhook_event = JSON.parse(rawdata);
console.log('🚀 ~ file: publiser.ts ~ line 75 ~ webhook_event', {
  webhook_event,
});

// import(file).then((data: any) => {
//   console.log('🚀 ~ file: publiser.ts ~ line 72 ~ data ~ data', { data });
// });
