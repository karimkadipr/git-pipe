
import GitService, { IRepublishParams } from "./features/git/git.service"


export default () => {

    const request: IRepublishParams = {
        gitRepos: "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish",
        masterBranch: "clone-master",
        developBranch: "develop",
    }

    GitService.republish(request)
}

