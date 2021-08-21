import path from 'path';
import shell from "./shelljs"

const rootDir = path.resolve(__dirname);

export const deleteFiles = (filesPaths: Array<string>): boolean => {

  // files paths from the Root path  
  const fullPaths = filesPaths.map(pth => path.join(rootDir, pth))

  const { code } = shell.rm('-rf', fullPaths);

  return code === 0
};

export const moveFiles = (filesPaths: Array<string>, dir: string): boolean => {

  // files paths from the Root path  
  const fullPaths = filesPaths.map(pth => path.join(rootDir, pth))
  const dirFromRoot = path.join(rootDir, dir)

  const { code } = shell.mv(fullPaths, dirFromRoot);

  return code === 0
};


export const overwriteFileContent = (fromFile: string, intoFile: string): boolean => {

  // files paths from the Root path  
  const fullPaths = [fromFile, intoFile].map(pth => path.join(rootDir, pth))

  const { code } = shell.cat(fullPaths[0], fullPaths[1]);

  return code === 0
};
