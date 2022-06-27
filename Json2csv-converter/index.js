const { Json2csv } = require("./modules/Json2csv.js");
const { Archiver } = require("./modules/Archiver.js");

// comments.json имеет объекты с ключами: postId, id, name, email, body.

const converter = new Json2csv(["id", "name"]); // В массиве указать поля, по которым фильтровать.
converter.convertToCSV("./data/comments.json"); // Указать адрес файла для конвертации в CSV.

const archiver = new Archiver();
// archiver._pack("./data/converted.csv");
// archiver._unpack("./data/converted.csv.gz");
