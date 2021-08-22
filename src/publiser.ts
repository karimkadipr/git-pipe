
import GitService from "./features/git/git.service"

GitService.republish({
    gitRepos: "git@github.com:ELDJAZAERY/tech-test.git",
    masterBranch: "test",
    developBranch: "dev",
})