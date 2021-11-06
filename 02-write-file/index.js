const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const { stdin, stdout } = process;
const outputFile = fs.createWriteStream(
  path.join(__dirname, 'destination.txt')
);
const rl = readLine.createInterface({ input: stdin });

stdout.write('Привет! Напиши, что хочешь добавить в файл!\n');

const exitFunction = () => {
  stdout.write('\nВся инфа добавлена в файл! Удачи!\n');
  process.exit();
};

rl.on('line', (data) => {
  if (data === 'exit') exitFunction();
  outputFile.write(data + '\n');
});

process.on('SIGINT', exitFunction);
