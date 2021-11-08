const fs = require('fs');
const path = require('path');
const { readdir, readFile, copyFile, mkdir } = require('fs/promises');
const copyDir = require('../04-copy-directory/index.js');
const createBundle = require('../05-merge-styles/index.js');

async function copyAssets(distFolder) {
  const filesFolder = path.join(__dirname, 'assets');
  const copyFolder = path.join(distFolder, 'assets');
  const files = await readdir(filesFolder, {
    withFileTypes: true,
  });

  for (let file of files) {
    if (file.isDirectory()) {
      const folderCurrentPath = path.join(filesFolder, file.name);
      const folderCopyPath = path.join(copyFolder, file.name);
      copyDir(folderCurrentPath, folderCopyPath);
    } else {
      await copyFile(
        path.join(filesFolder, file.name),
        path.join(copyFolder, file.name)
      );
    }
  }
}

async function buildPage(componentsFolder, distFolder) {}

async function buildSite(distFolder) {
  await mkdir(distFolder, { recursive: true });
  const stylesFolder = path.join(__dirname, 'styles');
  const bundlePath = path.join(distFolder, 'bundle.css');

  createBundle(stylesFolder, bundlePath);
  copyAssets(distFolder);
}

const distFolder = path.join(__dirname, 'project-dist');
buildSite(distFolder);
