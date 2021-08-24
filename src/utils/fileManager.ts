import path from 'path';
import shell from "./shelljs"

export const rootDir = path.resolve(require?.main?.filename || "", '..');

export const emptyDir = (dirPath: string): boolean => {

  const { code } = shell.rm('-rf', [`${dirPath}/*`]);

  return code === 0
};

export const deleteDir = (dirPath: string): boolean => {

  const { code } = shell.rm('-rf', [dirPath]);

  return code === 0
};

export const moveDir = (fromPath: string, toPath: string): boolean => {

  const { code } = shell.mv_dir(fromPath, toPath);

  return code === 0
};

export const deleteFiles = (filesPaths: Array<string>): boolean => {

  const { code } = shell.rm('-f', filesPaths);

  return code === 0
};

export const moveFiles = (filesPaths: Array<string>, dir: string): boolean => {

  const { code } = shell.mv(filesPaths, dir);

  return code === 0
};

export const overwriteFileContent = (fromFile: string, intoFile: string): boolean => {

  const { code } = shell.cat(fromFile, intoFile);

  return code === 0
};

export const overwriteFolderContent = (fromDir: string, intoDir: string): boolean => {

  const deleted = deleteDir(intoDir)

  if (!deleted) return false

  const { code: copied } = shell.cp_dir(fromDir, intoDir);

  return copied === 0
};

