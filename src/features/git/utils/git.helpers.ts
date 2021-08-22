import { exec } from "../../../utils/shelljs"
import path from 'path';

const rootDir = path.resolve(__dirname);

const scriptsRootPath = path.join(rootDir, "..", "/scripts")

var appDir = path.dirname(require?.main?.filename || "");

export const gitClone = async (repoUrl: string, branchName: string, repoName: string): Promise<boolean> => {

    const { code, stderr } = await exec(`${scriptsRootPath}/clone.sh`, [repoUrl, branchName, repoName])

    console.error(stderr)

    return code === 0
}

export const getGitDir = (repoName: string): string => {
    return path.join(appDir, "temp", repoName, '.git')
}

export const getHead = async (repoName: string): Promise<string | undefined> => {

    const { code, stdout, stderr } = await exec(`${scriptsRootPath}/clone.sh`, [getGitDir(repoName)])

    console.error(stderr)

    return code === 0 ? stdout : undefined
}

export const getCommits = async (repoName: string, sinceCommit: string, toCommit?: string): Promise<string[]> => {

    const { code, stderr, stdout } = await exec(`${scriptsRootPath}/clone.sh`, [getGitDir(repoName), sinceCommit, toCommit || ""])

    console.error(stderr)

    console.log({ code, stdout, stderr })

    return []
}