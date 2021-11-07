const path = require('path');
const fs = require('fs');
const { stdout } = process;

const secretFolder = path.join(__dirname, 'secret-folder');

async function getFilesList() {
  const files = await fs.promises.readdir(secretFolder, {
    withFileTypes: true,
  });

  for (let file of files) {
    fs.stat(path.join(secretFolder, file.name), (err, stats) => {
      if (stats.isFile()) {
        stdout.write(
          `${file.name.replace(path.extname(file.name), '')}-${path
            .extname(file.name)
            .replace('.', '')}-${stats.size}b\n`
        );
      }
    });
  }
}

getFilesList();
