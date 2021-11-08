const { copyFile, mkdir, rm, readdir } = require('fs/promises');
const path = require('path');

async function copyDir(filesFolder, copyFolder) {
  await mkdir(copyFolder, { recursive: true });

  const files = await readdir(filesFolder, {
    withFileTypes: true,
  });
  const filesFromCopyFolder = await readdir(copyFolder);

  for (let file of filesFromCopyFolder) {
    await rm(path.join(copyFolder, file));
  }

  for (let file of files) {
    await copyFile(
      path.join(filesFolder, file.name),
      path.join(copyFolder, file.name)
    );
  }
}

const filesFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

copyDir(filesFolder, copyFolder);
module.exports = copyDir;
