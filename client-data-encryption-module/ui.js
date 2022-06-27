const { Readable } = require("stream");
const { Check } = require("./data.check.js");

// класс Ui поставляет данные.

class Ui extends Readable {
  constructor(data, options = { objectMode: true }) {
    super(options);
    this.data = data;
    this.init();
  }

  init() {
    this.on("error", (error) => {
      console.log(error.message);
    });
  }

  _read() {
    new Check().check(this.data);
    const data = this.data.shift();

    if (!data) {
      this.push(null);
    } else {
      this.push(data);
    }
  }
}

module.exports = { Ui };
