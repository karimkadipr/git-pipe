
import path from 'path';
import { deleteDir, moveDir, overwriteFolderContent } from '../../utils/fileManager';
import { getHead, gitClone, listCommit, checkout, commit } from './utils/git.helpers';

const appDir = path.dirname(require?.main?.filename || "");

export interface IRepublishParams {
  gitRepos: string, // URL
  developBranch: string, // name of the branch to republish theirs commits
  masterBranch: string // name of branch to commit on
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

    /** Get All new Commits Between HEAD(master) and HEAD(develop)  */
    const listCommits = await listCommit(developReposName, masterBranchHEAD)

    console.log(" ############   ")
    listCommits.forEach((e: string, index: number) => console.log(`Commit Hash N${index} ==> `, e));
    console.log(" ############   ")

    const publiserRoot = path.join(appDir, '..', "temp", container)

    for (let commitHash of listCommits) {


      console.log("  ##########  For Loop , checkout #########  ")

      /** Checkout Develop Repo to Current Commit from  HEAD(master) to HEAD(develop) */
      const checked = await checkout(developReposName, commitHash)
      if (!checked) return false

      console.log("  ##########  For Loop, moveDir #########  ")

      /** save .git file into publiser container  */
      let moved = moveDir(path.join(publiserRoot, masterReposName, '.git'), path.join(publiserRoot, 'saved-master-git'))
      if (!moved) return false

      /** 
       * @Over_Write_Folder_Content
       * 
       * Empty Master Folder 
       * 
       * Copy all file and folders from dev to master
       * 
       * */
      overwriteFolderContent(path.join(publiserRoot, developReposName), path.join(publiserRoot, masterReposName))

      console.log("  ##########  For Loop, overwriteFolderContent #########  ")

      /** 
       * 
       * Replace .git file in master repo by his old .git saved-master-git 
       * 
       * Delete .git file in master repos 
       * 
       * Restore saved-master-git to master repos as .git file
       * 
       * */
      const deleted = deleteDir(path.join(publiserRoot, masterReposName, '.git'))
      if (!deleted) return false;

      console.log("  ##########  For Loop, deleteDir #########  ")

      moved = moveDir(path.join(publiserRoot, 'saved-master-git'), path.join(publiserRoot, masterReposName, '.git'))
      if (!moved) return false

      console.log("  ##########  For Loop, moveDir #########  ")

      /** @_COMMIT_ */
      // const commited = await commit(masterReposName)
      // if (!commited) return false

      console.log("  ##########  For Loop, commited #########  ")

    }

    return true

  }

}
