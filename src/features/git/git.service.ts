
import path from 'path';
import { deleteDir, moveDir, overwriteFolderContent } from '../../utils/fileManager';
import { getHead, gitClone, listCommit, checkout, commit, push, description } from './utils/git.helpers';

const appDir = path.join(path.dirname(require?.main?.filename || ""), '..')

export interface IRepublishParams {
  gitRepos: string, // URL
  developBranch: string, // the name of the branch that we wish to merge its commits to the master branch
  masterBranch: string // the name of the branch that we wish to merge into
  /**
   * @TODO LATER
   *  RSA key for Authenticate and sign commits
   */
}

export default class GitService {

  static republish = async ({
    gitRepos,
    developBranch,
    masterBranch
  }: IRepublishParams): Promise<boolean> => {

    const container = `republisher-${Math.floor(Math.random() * 1000)}`

    /** Clone Master Branch */
    const masterReposName = path.join('temp', container, `master-${Math.floor(Math.random() * 1000)}`)
    const CloneMasterBranch = await gitClone(gitRepos, masterBranch, masterReposName)
    if (!CloneMasterBranch) return false

    /** Clone Develop Branch */
    const developReposName = path.join('temp', container, `develop-${Math.floor(Math.random() * 1000)}`)
    const CloneDevelopBranch = await gitClone(gitRepos, developBranch, developReposName)
    if (!CloneDevelopBranch) return false

    /** Get Master HEAD  */
    const masterBranchHEAD = await getHead(masterReposName)
    if (!masterBranchHEAD) return false

    /** Get Develop HEAD  */
    const developBranchHEAD = await getHead(developReposName)
    if (!developBranchHEAD) return false

    /** Get All new Commits Between HEAD(master) and HEAD(develop)  */
    const listCommits = await listCommit(developReposName, masterBranchHEAD)

    const publiserRoot = path.join(appDir, "temp", container)

    for (let index in listCommits) {

      const commitHash = listCommits[index]

      /** Checkout Develop Repo to Current Commit */
      const checked = await checkout(developReposName, commitHash)
      if (!checked) return false

      /** save .git file into publiser container  */
      let moved = moveDir(path.join(appDir, masterReposName, '.git'), path.join(publiserRoot, 'saved-master-git'))
      if (!moved) return false

      /** 
       * @Over_Write_Folder_Content
       * 
       * Empty Master Folder 
       * 
       * Copy all file and folders from dev to master
       * 
       * */
      overwriteFolderContent(path.join(appDir, developReposName), path.join(appDir, masterReposName))


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
      const deleted = deleteDir(path.join(appDir, masterReposName, '.git'))
      if (!deleted) return false;

      moved = moveDir(path.join(publiserRoot, 'saved-master-git'), path.join(appDir, masterReposName, '.git'))
      if (!moved) return false

      const currentCommitDescription = await description(developReposName, commitHash)

      /** @_COMMIT_ */
      const commited = await commit(masterReposName, currentCommitDescription)
      if (!commited) return false

    }

    /** Out of the loop  */

    /**  Finally push to master origin */
    const pushed = await push(masterReposName)

    return pushed
  }

}
