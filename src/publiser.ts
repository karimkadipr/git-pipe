
import GitService, { IRepublishParams } from "./features/git/git.service"


export const publisher = () => {

    const args = process.argv.slice(2)
    let request: IRepublishParams;

    if (args.length !== 3)
        request = {
            gitRepos: "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish",
            masterBranch: "clone-master",
            developBranch: "develop",
        }
    else
        request = {
            gitRepos: args[0],
            masterBranch: args[1],
            developBranch: args[2],
        }

    GitService.republish(request)
}


publisher()