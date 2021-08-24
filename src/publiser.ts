
import GitService, { IRepublishParams } from "./features/git/git.service"


export const publisher = () => {

    // const args = process.argv.slice(2)

    // if (args.length !== 3) {
    //     console.error(" Invalid args ")
    //     process.exit(1)
    // }

    // const requestFromArgs: IRepublishParams = {
    //     gitRepos: args[0],
    //     masterBranch: args[1],
    //     developBranch: args[2],
    // }

    const request: IRepublishParams = {
        gitRepos: "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/git-republish",
        masterBranch: "clone-master",
        developBranch: "develop",
    }

    GitService.republish(request)
}


publisher()