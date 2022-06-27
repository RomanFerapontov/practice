const EventEmitter = require("events");

/* Класс Check является обработчиком ошибок. */

class Check extends EventEmitter {
  constructor() {
    super();
  }

  check(data) {
    data.forEach((obj) => {
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      if (keys.length !== 3) {
        this.emit("error", new Error("Неверное количество полей."));
      }
      if (
        !keys.includes("name") ||
        !keys.includes("email") ||
        !keys.includes("password")
      ) {
        this.emit("error", new Error("Неверное название одного из полей."));
      }

      for (let value of values) {
        if (typeof value !== "string") {
          this.emit(
            "error",
            new Error(`Неверный тип данных: ${value} - ${typeof value}.`)
          );
        }
      }
    });
  }
}

module.exports = { Check };
