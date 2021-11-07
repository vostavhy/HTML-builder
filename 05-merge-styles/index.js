const fs = require('fs');
const path = require('path');
const { readdir, readFile } = require('fs/promises');

const stylesFolder = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

const fileOutput = fs.createWriteStream(bundlePath);

async function createBundle() {
  const files = await readdir(stylesFolder, {
    withFileTypes: true,
  });

  for (let file of files) {
    if (path.extname(file.name) !== '.css') continue;
    if (!file.isFile()) continue;

    const fileInput = await readFile(path.join(stylesFolder, file.name));
    fileOutput.write(fileInput + '\n');
  }
}

createBundle();
