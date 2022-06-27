const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

// Класс Archiver() выполняет архивацию и распаковку файла CSV.

class Archiver {
  constructor() {}
  _pack(filePath) {
    const gzip = zlib.createGzip();
    const read = fs.createReadStream(filePath);
    const write = fs.createWriteStream(`${filePath}.gz`);
    read.pipe(gzip).pipe(write);
  }

  _unpack(archivePath) {
    const unzip = zlib.createGunzip();
    const read = fs.createReadStream(archivePath);
    const write = fs.createWriteStream(
      path.join(__dirname, "../data", "unzipped.csv")
    );
    read.pipe(unzip).pipe(write);
  }
}

module.exports = { Archiver };
