import path from 'path';
import os from 'os';

import { exec } from '../../../utils/shelljs';

const rootDir = path.resolve(__dirname);

const scriptsRootPath = path.join(rootDir, '..', '/scripts');

const appDir = path.dirname(require?.main?.filename || '');

export const gitClone = async (
  repoUrl: string,
  repoName: string,
  branchName?: string,
): Promise<boolean> => {
  const { code, stderr } = await exec(
    `${scriptsRootPath}/clone.sh`,
    branchName ? [repoUrl, repoName, branchName] : [repoUrl, repoName],
  );

  stderr && console.error(' stderr ====> ', stderr);

  return code === 0;
};

export const getGitDir = (repoName: string): string => {
  return path.join(appDir, '..', repoName, '.git');
};

export const getHead = async (
  repoName: string,
): Promise<string | undefined> => {
  console.log('🚀 ~ file: git.helpers.ts ~ line 35 ~ repoName', repoName);
  const { code, stdout, stderr } = await exec(
    `${scriptsRootPath}/get-head.sh`,
    [getGitDir(repoName)],
  );

  stderr && console.error(' stderr ====> ', stderr);

  return code === 0 ? stdout : undefined;
};

export const getBranchingPoint = async (
  repoName: string,
  baseBranch: string,
  developBranch: string,
): Promise<string | undefined> => {
  // console.log(
  //   '🚀 ~ file: git.helpers.ts ~ line 51 ~ repoName',
  //   repoName,
  //   `git --git-dir=${getGitDir(
  //     repoName,
  //   )}: merge-base ${baseBranch} ${developBranch}`,
  // );
  // const script = `git --git-dir=${getGitDir(repoName)} merge-base develop main`;
  const { code, stdout, stderr } = await exec(
    `${scriptsRootPath}/get-branching-point.sh`,
    [getGitDir(repoName), baseBranch, developBranch],
  );

  stderr && console.error(' stderr ====> ', stderr);

  return code === 0 ? stdout : undefined;
};

export const listCommit = async (
  repoName: string,
  sinceCommit: string,
  toCommit?: string,
): Promise<string[]> => {
  const { code, stdout, stderr } = await exec(
    `${scriptsRootPath}/list-commits.sh`,
    [getGitDir(repoName), sinceCommit, toCommit || ''],
  );

  stderr && console.error(' stderr ====> ', stderr);

  return stdout !== '' ? stdout.split(os.EOL).reverse() : [];
};

export const listCommitWithDesc = async (
  repoName: string,
  sinceCommit: string,
  toCommit?: string,
): Promise<string[]> => {
  const { code, stdout, stderr } = await exec(
    `${scriptsRootPath}/list-commits-desc.sh`,
    [getGitDir(repoName), sinceCommit, toCommit || ''],
  );

  stderr && console.error(' stderr ====> ', stderr);

  return stdout !== '' ? stdout.split(os.EOL).reverse() : [];
};

export const checkout = async (
  repoName: string,
  commit: string,
): Promise<boolean> => {
  const { code, stdout, stderr } = await exec(
    `${scriptsRootPath}/checkout.sh`,
    [getGitDir(repoName), commit],
  );

  stderr && console.error(' stderr ====> ', stderr);

  console.log({ code, stdout, stderr });

  return code === 0;
};

export const description = async (
  repoName: string,
  commit: string,
): Promise<string> => {
  const { code, stderr, stdout } = await exec(
    `${scriptsRootPath}/commit-show.sh`,
    [getGitDir(repoName), commit],
  );

  stderr &&
    console.error(' ##### stderr, stdout ====> ', stdout.replace(os.EOL, ''));

  return code === 0 ? stdout.replace(os.EOL, '') : 'No Description';
};

export const commit = async (
  repoName: string,
  msg: string,
): Promise<boolean> => {
  const { code, stderr } = await exec(`${scriptsRootPath}/commit.sh`, [
    getGitDir(repoName),
    `"${msg}"`,
  ]);

  stderr && console.error(' ##### stderr, stdout ====> ', stderr);

  return code === 0;
};

export const push = async (repoName: string): Promise<boolean> => {
  const { code, stderr } = await exec(`${scriptsRootPath}/push.sh`, [
    getGitDir(repoName),
  ]);

  stderr && console.error(' ##### stderr, stdout ====> ', stderr);

  return code === 0;
};
