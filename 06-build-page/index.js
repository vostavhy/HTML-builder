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

async function buildPage(componentsFolder, distFolder) {
  const components = await readdir(componentsFolder, {
    withFileTypes: true,
  });

  let componentsObjects = [];

  for (let component of components) {
    const extName = path.extname(component.name);
    if (extName !== '.html') continue;
    const html = await readFile(
      path.join(componentsFolder, component.name),
      'utf-8'
    );
    componentsObjects.push({
      name: component.name.slice(0, component.name.length - extName.length),
      html: html,
    });
  }

  let template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  for (let component of componentsObjects) {
    template = template.replace(`{{${component.name}}}`, component.html);
  }

  const htmlPath = path.join(distFolder, 'index.html');
  const fileOutput = fs.createWriteStream(htmlPath);
  fileOutput.write(template);
}

async function buildSite(distFolder) {
  await mkdir(distFolder, { recursive: true });
  const stylesFolder = path.join(__dirname, 'styles');
  const bundlePath = path.join(distFolder, 'style.css');
  const componentsFolder = path.join(__dirname, 'components');

  createBundle(stylesFolder, bundlePath);
  copyAssets(distFolder);
  buildPage(componentsFolder, distFolder);
}

const distFolder = path.join(__dirname, 'project-dist');
buildSite(distFolder);
