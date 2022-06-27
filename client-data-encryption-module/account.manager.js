const { Writable } = require("stream");

// класс AccountManager является хранилищем данных.

class AccountManager extends Writable {
  constructor(options = { objectMode: true }) {
    super(options);
    this.usersPayload = [];
    this.init();
  }

  init() {
    this.on("finish", () => {
      console.log("Получены данные:");
      console.log(this.usersPayload);
    });
  }

  _write(chunk, encode, done) {
    this.usersPayload.push(chunk);
    done();
  }
}

module.exports = { AccountManager };
