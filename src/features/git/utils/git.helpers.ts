import path from 'path';
import os from 'os'

import { exec } from "../../../utils/shelljs"

const rootDir = path.resolve(__dirname);

const scriptsRootPath = path.join(rootDir, "..", "/scripts")

const appDir = path.dirname(require?.main?.filename || "");

export const gitClone = async (repoUrl: string, branchName: string, repoName: string): Promise<boolean> => {

    const { code, stderr } = await exec(`${scriptsRootPath}/clone.sh`, [repoUrl, repoName, branchName])

    stderr && console.error(" stderr ====> ", stderr)

    return code === 0
}


export const getGitDir = (repoName: string): string => {
    return path.join(appDir, '..', repoName, '.git')
}

export const getHead = async (repoName: string): Promise<string | undefined> => {

    const { code, stdout, stderr } = await exec(`${scriptsRootPath}/get-head.sh`, [getGitDir(repoName)])

    stderr && console.error(" stderr ====> ", stderr)

    return code === 0 ? stdout : undefined
}

export const listCommit = async (repoName: string, sinceCommit: string, toCommit?: string): Promise<string[]> => {

    const { code, stdout, stderr, } = await exec(`${scriptsRootPath}/list-commits.sh`, [getGitDir(repoName), sinceCommit, toCommit || ""])

    stderr && console.error(" stderr ====> ", stderr)

    console.log({ code, stdout, stderr })

    return stdout !== '' ? stdout.split(os.EOL).reverse() : []
}


export const checkout = async (repoName: string, commit: string): Promise<boolean> => {

    const { code, stdout, stderr, } = await exec(`${scriptsRootPath}/checkout.sh`, [getGitDir(repoName), commit])

    stderr && console.error(" stderr ====> ", stderr)

    console.log({ code, stdout, stderr })

    return code === 0
}


export const commit = async (repoName: string): Promise<boolean> => {

    const { code, stderr } = await exec(`${scriptsRootPath}/commit.sh`, [getGitDir(repoName)])

    stderr && console.error(" stderr ====> ", stderr)

    return code === 0
}