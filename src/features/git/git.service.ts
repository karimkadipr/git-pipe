import path from 'path';
import { echo } from 'shelljs';
import {
  deleteDir,
  moveDir,
  overwriteFolderContent,
} from '../../utils/fileManager';
import { Confirm } from '../../utils/shelljs';
import {
  getHead,
  gitClone,
  listCommit,
  checkout,
  commit,
  push,
  description,
  listCommitWithDesc,
} from './utils/git.helpers';

const appDir = path.join(path.dirname(require?.main?.filename || ''), '..');

interface IAuthor {
  name: string;
  email: string;
}

export interface ICommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: IAuthor;
  added: string[];
  modified: string[];
  removed: string[];
}
export interface IRepublishParams {
  gitDevRepos: string; // URL
  developBranch: string; // the name of the branch that we wish to merge its commits to the master branch
  gitMasterRepos: string; // URL
  masterBranch: string; // the name of the branch that we wish to merge into
  commits: ICommit[];
  /**
   * @TODO LATER
   *  RSA key for Authenticate and sign commits
   */
}

export default class GitService {
  static republish = async ({
    gitDevRepos,
    developBranch,
    gitMasterRepos,
    masterBranch,
    commits,
  }: IRepublishParams): Promise<boolean> => {
    try {
      const container = `republisher-${Math.floor(Math.random() * 1000)}`;

      /** Clone Master Branch */
      const masterReposName = path.join(
        'temp',
        container,
        `master-${Math.floor(Math.random() * 1000)}`,
      );

      const CloneMasterBranch = await gitClone(
        gitMasterRepos,
        masterBranch,
        masterReposName,
      );

      if (!CloneMasterBranch) return false;

      /** Clone Develop Branch */
      const developReposName = path.join(
        'temp',
        container,
        `develop-${Math.floor(Math.random() * 1000)}`,
      );

      const CloneDevelopBranch = await gitClone(
        gitDevRepos,
        developBranch,
        developReposName,
      );
      if (!CloneDevelopBranch) return false;

      /** Get Master HEAD  */
      const masterBranchHEAD = await getHead(masterReposName);
      if (!masterBranchHEAD) return false;

      /** Get Develop HEAD  */
      const developBranchHEAD = await getHead(developReposName);
      if (!developBranchHEAD) return false;

      /** No commits to be republished  */
      if (masterBranchHEAD === developBranchHEAD) {
        console.info(' Everything up-to-date  ');
        return true;
      }

      /** Get All new Commits Between HEAD(master) and HEAD(develop)  */
      // const listCommitsWithMsgs = await listCommitWithDesc(
      //   developReposName,
      //   masterBranchHEAD,
      // );

      /** Get All new Commits Between HEAD(master) and HEAD(develop)  */

      const publiserRoot = path.join(appDir, 'temp', container);

      for (let index in commits) {
        const commitHash = commits[index].id;

        /** Checkout Develop Repo to Current Commit */
        const checked = await checkout(developReposName, commitHash);
        if (!checked) return false;

        /** save .git file into publiser container  */
        let moved = moveDir(
          path.join(appDir, masterReposName, '.git'),
          path.join(publiserRoot, 'saved-master-git'),
        );
        if (!moved) return false;

        /**
         * @Over_Write_Folder_Content
         *
         * Empty Master Folder
         *
         * Copy all file and folders from dev to master
         *
         * */
        overwriteFolderContent(
          path.join(appDir, developReposName),
          path.join(appDir, masterReposName),
        );

        /**
         *
         * At this moment Master repo has the .git copied with others files from the develop repos
         * so we should restore his old .git file stored in `saved-master-git` in the container
         *
         *    1- Delete .git file in master repos
         *
         *    2- Restore saved-master-git to master repos as .git file
         *
         * */
        const deleted = deleteDir(path.join(appDir, masterReposName, '.git'));
        if (!deleted) return false;

        moved = moveDir(
          path.join(publiserRoot, 'saved-master-git'),
          path.join(appDir, masterReposName, '.git'),
        );
        if (!moved) return false;

        const currentCommitDescription = await description(
          developReposName,
          commitHash,
        );

        /** @_COMMIT_ */
        const commited = await commit(
          masterReposName,
          currentCommitDescription,
        );
        if (!commited) return false;
      }

      /** Out of the loop  */

      /**  Finally push to gitMaster Repos origin */
      const pushed = await push(masterReposName);
      echo(
        `\n\n${masterReposName} is up to date with ${developBranch}, modification has been pushed to origin ${masterReposName}\n`,
      );
      return pushed;

      // echo(
      //   `\n\n${masterReposName} is up to date with ${developBranch}, only merged PR allowed to push the modification to your origin ${masterReposName}\n`,
      // );

      // return true;
    } catch {
      return false;
    }
  };
}
