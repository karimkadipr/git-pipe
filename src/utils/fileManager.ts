import path from 'path';
import shell from "./shelljs"

const rootDir = path.resolve(require?.main?.filename || "", '..');

export const emptyDir = (dirPath: string): boolean => {

  // files paths from the Root path  
  const fullPaths = dirPath.startsWith(rootDir) ? dirPath : path.join(rootDir, dirPath)

  const { code } = shell.rm('-rf', [`${fullPaths}/*`]);

  return code === 0
};

export const deleteDir = (dirPath: string): boolean => {

  // files paths from the Root path  
  const fullPaths = dirPath.startsWith(rootDir) ? dirPath : path.join(rootDir, dirPath)

  const { code } = shell.rm('-rf', [fullPaths]);

  return code === 0
};

export const moveDir = (fromPath: string, toPath: string): boolean => {

  // files paths from the Root path  
  const fromPath_Root = path.join(rootDir, fromPath)
  const toPath_Root = path.join(rootDir, toPath)

  const { code } = shell.mv_dir(fromPath_Root, toPath_Root);

  return code === 0
};

export const deleteFiles = (filesPaths: Array<string>): boolean => {

  // files paths from the Root path  
  const fullPaths = filesPaths.map(pth => pth.startsWith(rootDir) ? pth : path.join(rootDir, pth))

  const { code } = shell.rm('-f', fullPaths);

  return code === 0
};

export const moveFiles = (filesPaths: Array<string>, dir: string): boolean => {

  // files paths from the Root path  
  const fullPaths = filesPaths.map(pth => pth.startsWith(rootDir) ? pth : path.join(rootDir, pth))
  const dirFromRoot = path.join(rootDir, dir)

  const { code } = shell.mv(fullPaths, dirFromRoot);

  return code === 0
};

export const overwriteFileContent = (fromFile: string, intoFile: string): boolean => {

  // files paths from the Root path  
  const fullPaths = [fromFile, intoFile].map(pth => pth.startsWith(rootDir) ? pth : path.join(rootDir, pth))

  const { code } = shell.cat(fullPaths[0], fullPaths[1]);

  return code === 0
};

export const overwriteFolderContent = (fromDir: string, intoDir: string): boolean => {

  // files paths from the Root path  
  const fromPath_Root = path.join(rootDir, fromDir)
  const toPath_Root = path.join(rootDir, intoDir)

  const deleted = deleteDir(fromPath_Root)
  const { code: createdCode } = shell.mkdir('-p', [toPath_Root])

  if (!deleted || createdCode !== 0) return false

  const { code: copied } = shell.cp_all_in_dir(fromPath_Root, toPath_Root);

  return copied === 0
};