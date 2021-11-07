const { copyFile, mkdir, rm, readdir } = require('fs/promises');
const path = require('path');

const filesFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  await mkdir(copyFolder, { recursive: true });
  const files = await readdir(filesFolder);
  const filesFromCopyFolder = await readdir(copyFolder);

  for (let file of filesFromCopyFolder) {
    await rm(path.join(copyFolder, file));
  }

  for (let file of files) {
    await copyFile(path.join(filesFolder, file), path.join(copyFolder, file));
  }
}

copyDir();
