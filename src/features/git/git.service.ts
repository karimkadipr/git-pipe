
import { getHead, gitClone, getCommits } from './utils/git.helpers';

interface IRepublishParams {
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

    const masterReposName = `master-${Math.floor(Math.random() * 100)}`
    const CloneMasterBranch = await gitClone(gitRepos, masterBranch, `temp/${masterReposName}`)
    if (!CloneMasterBranch) return false

    const developReposName = `develop-${Math.floor(Math.random() * 100)}`
    const CloneDevelopBranch = await gitClone(gitRepos, developBranch, `temp/${developReposName}`)
    if (!CloneDevelopBranch) return false

    const masterBranchHEAD = await getHead(masterReposName)
    if (!masterBranchHEAD) return false

    const listCommits = await getCommits(masterReposName, masterBranchHEAD)

    console.log(" listCommits ==>  ", listCommits)

    return true

  }
}
