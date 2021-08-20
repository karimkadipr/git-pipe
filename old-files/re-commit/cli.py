import subprocess

def execShell(command):
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    output, *rest = p.communicate()
    return (p, output.decode('utf-8'), *rest)

def getCommitFiles(repoPath, commitId):
    getCommitFilesGitCommand = 'git diff-tree --no-commit-id --name-only -r'
    getCommitFilesGitCommand += (' ' + commitId)
    changeDirectoryCommand = 'cd ' + repoPath
    execCommand = changeDirectoryCommand + ' && ' + getCommitFilesGitCommand
    output = execShell(execCommand)[1]
    print(output)
    filesList = output.split('\n')
    if filesList[-1] == '':
        filesList = filesList[0:-1]
    return filesList

def getAllCommitsIdsBetween(gitRepo, startCommitId, endCommitId):
    cdRepoCommand = 'cd ' + gitRepo
    logCommitsListCommand = 'git log --oneline ' + startCommitId + '..' + endCommitId
    output = execShell(cdRepoCommand + '&&' + logCommitsListCommand)[1]
    commits = [line.split(' ')[0] for line in output.split('\n')]
    if commits[-1] == '':
        commits = commits[0:-1]
    return commits

def copyFiles():
    


srcRepoPath = '/Users/user203328/Documents/GitHub/are'
commitId = 'e688177'

filesList = getCommitFiles(srcRepoPath, commitId)
print('Files list: ')
print(filesList)

print('List of commits:')
commits = getAllCommitsIdsBetween(srcRepoPath, 'd286c46', 'HEAD')
print(commits)
