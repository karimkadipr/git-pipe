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
  getBranchingPoint,
  checkout,
  commit,
  push,
  description,
  listCommitWithDesc,
} from './utils/git.helpers';

const appDir = path.join(path.dirname(require?.main?.filename || ''), '..');
export interface IRepublishParams {
  gitDevRepos: string; // URL
  developBranch: string; // the name of the branch that we wish to merge its commits to the master branch
  gitMasterRepos: string; // URL
  masterBranch: string; // the name of the branch that we wish to merge into
  developBranchBase: string;
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
    developBranchBase,
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
        masterReposName,
        masterBranch,
      );

      if (!CloneMasterBranch) return false;

      /** Clone Develop Branch */
      const developReposName = path.join(
        'temp',
        container,
        `develop-${Math.floor(Math.random() * 1000)}`,
      );

      const CloneDevelopBranch = await gitClone(gitDevRepos, developReposName);
      if (!CloneDevelopBranch) return false;

      /** Get Master HEAD  */
      const masterBranchHEAD = await getHead(masterReposName);
      console.log(
        '🚀 ~ file: git.service.ts ~ line 72 ~ GitService ~ masterBranchHEAD',
        masterBranchHEAD,
      );
      if (!masterBranchHEAD) return false;

      /** Get Develop HEAD  */
      const developBranchHEAD = await getHead(developReposName);
      console.log(
        '🚀 ~ file: git.service.ts ~ line 76 ~ GitService ~ developBranchHEAD',
        developBranchHEAD,
      );
      if (!developBranchHEAD) return false;

      /** No commits to be republished  */
      if (masterBranchHEAD === developBranchHEAD) {
        console.info(' Everything up-to-date  ');
        return true;
      }
      const BranchingPoint = await getBranchingPoint(
        developReposName,
        developBranchBase,
        developBranch,
      );
      console.log(
        '🚀 ~ file: git.service.ts ~ line 96 ~ GitService ~ BranchingPoint',
        BranchingPoint,
      );

      const listCommits = await listCommit(
        developReposName,
        BranchingPoint ?? '',
        'develop',
      );

      listCommits.shift();

      console.log(
        '🚀 ~ file: git.service.ts ~ line 116 ~ GitService ~ listCommits',
        { listCommits },
      );

      /* Get All new Commits Between HEAD(master) and HEAD(develop)  */

      const publiserRoot = path.join(appDir, 'temp', container);

      for (let index in listCommits) {
        const commitHash = listCommits[index];
        /** Checkout Develop Repo to Current Commit */
        const checked = await checkout(
          developReposName,
          commitHash,
          developBranch,
        );
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
          developBranch,
        );

        /** @_COMMIT_ */
        const commited = await commit(
          masterReposName,
          currentCommitDescription,
        );
        console.log(
          '🚀 ~ file: git.service.ts ~ GitService ~ commited',
          commited,
        );
        if (!commited) {
          echo('❌ 🚀 Chenages not committed.');
          return false;
        }
      }
      /** Out of the loop  */
      /**  Finally push to gitMaster Repos origin */
      if (listCommits.length != 0) {
        const pushed = await push(masterReposName);
        echo(
          `\n\n ✅ 🚀 ${masterReposName} is up to date with ${developBranch}, modification has been pushed to origin ${masterReposName}\n`,
        );
        return pushed;
      } else {
        echo(`\n\n ❌ 🚀 No Commits To push \n`);
        return true;
      }
    } catch {
      return false;
    }
  };
}
