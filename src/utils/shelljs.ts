
import shell from 'shelljs'

export declare type ShellResponse = {
    code: number,
    stdout: string,
    stderr: string
}

export const exec = async (filePath: string, args: Array<string>): Promise<ShellResponse> => {

    // convert calback to async func 
    return new Promise(resolve => {

        // convert array of arg to argStr
        const argvStr = args.join(" ")

        shell.exec(`${filePath} ${argvStr}`, { silent: true, async: true }, (code: number, stdout: string, stderr: string) => {
            resolve({ code, stdout, stderr })
        });
    })
}

export const cat = (fromFile: string, intoFile: string): ShellResponse => {
    const { code, stdout, stderr } = shell.cat(fromFile, intoFile)

    return {
        code, stdout, stderr
    }
}

export const cp = (opt: '-f' | '-n' | '-u' | '-r' | '-L' | '-P' | '', filesPaths: Array<string>): ShellResponse => {
    const { code, stdout, stderr } = opt !== '' ? shell.rm(opt, filesPaths) : shell.rm(filesPaths)

    return {
        code, stdout, stderr
    }
}

export const cp_all_in_dir = (from: string, to: string): ShellResponse => {
    const { code, stdout, stderr } = shell.cp('-R', `${from}/.`, to)

    return {
        code, stdout, stderr
    }
}

export const rm = (opt: '-r' | '-f' | '-rf' | '', filesPaths: Array<string>): ShellResponse => {
    const { code, stdout, stderr } = opt !== '' ? shell.rm(opt, filesPaths) : shell.rm(filesPaths)

    return {
        code, stdout, stderr
    }
}


export const mv = (filesPaths: Array<string>, dir: string): ShellResponse => {
    const { code, stdout, stderr } = shell.mv(filesPaths, dir)

    return {
        code, stdout, stderr
    }
}

export const mv_dir = (from: string, to: string): ShellResponse => {
    const { code, stdout, stderr } = shell.mv(from, to)

    return {
        code, stdout, stderr
    }
}

export const mkdir = (opt: '-p' | '', filesPaths: Array<string>): ShellResponse => {
    const { code, stdout, stderr } = opt !== '' ? shell.mkdir(opt, filesPaths) : shell.mkdir(filesPaths)

    return {
        code, stdout, stderr
    }
}

export const ls = (opt: '-A' | '-L' | '-d' | '-l' | '', filesPaths: Array<string>): ShellResponse => {
    const { code, stdout, stderr } = opt !== '' ? shell.ls(opt, filesPaths) : shell.ls(filesPaths)

    return {
        code, stdout, stderr
    }
}

export const grep = (regExpres: string, filesPaths: Array<string>): ShellResponse => {
    const { code, stdout, stderr } = shell.grep(regExpres, filesPaths)

    return {
        code, stdout, stderr
    }
}

export default {
    exec,
    cat,
    cp,
    rm,
    mv,
    mv_dir,
    mkdir,
    ls,
    grep,
    cp_all_in_dir
}