// Mодуль создания CSV файлов.

const fs = require("fs").promises;
const path = require("path");

/* Класс Json2csv конвертирует JSON в CSV.
В качестве аргумента принимает массив с названием столбцов,
которые должны попасть в CSV файл. */

class Json2csv {
  constructor(array) {
    this.array = array;
  }

  /* Метод convert() принимает JSON файл в качестве аргумента,
  преобразует его в CSV с помощью метода json2csv() и записывает
  на диск. */

  convertToCSV(json) {
    const filePath = path.join(__dirname, "..", `${json}`);
    fs.readFile(filePath).then((fileData) => {
      const csvData = this.json2csv(JSON.parse(fileData));
      fs.writeFile(
        path.join(__dirname, "../data", "converted.csv"),
        csvData,
        (err) => {
          console.log(err.message);
        }
      );
    });
  }

  json2csv(data) {
    let csv = "";

    // Создание фильтра для JSON файла по ключам объектов.
    const filterArray = data.map((el) => {
      Object.keys(el).forEach((key) => {
        if (this.array.length === 0) {
          return el;
        } else if (!this.array.includes(key)) {
          delete el[key];
        }
      });
      return el;
    });

    // Создание заголовков CSV файла.
    const keys = filterArray.map((el) => {
      return Object.keys(el).join(",");
    });
    const headers = [...new Set(keys)];

    // Преобразование значений объектов JSON в строки.
    const values = filterArray.map((el) => {
      return Object.values(el).join(",");
    });

    // Формирование CSV файла для записи.
    csv += `${headers[0]}\n`;

    values.forEach((el) => {
      csv += `${el.replaceAll("\n", "\\n")}\n`;
    });
    return csv;
  }
}

module.exports = { Json2csv };
