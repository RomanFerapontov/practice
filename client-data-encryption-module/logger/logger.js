const EventEmitter = require("events");
const { Transform } = require("stream");
const fs = require("fs");
const path = require("path");

class Logger extends Transform {
  constructor(
    options = {
      objectMode: true,
      readableObjectMode: true,
      decodeStrings: false,
    }
  ) {
    super(options);
    this.init();
  }

  init() {
    this.on("data", (data) => {
      const dataForLogger = this.loggerData(data);
      this.newLoggerNote(dataForLogger);
    });

    this.on("finish", () => {
      console.log("Данные записаны в логгер.");
    });
  }

  loggerData(data) {
    const newData = {
      source: "guardian",
      payload: data.payload,
      created: new Date(),
    };
    return newData;
  }

  newLoggerNote(obj) {
    try {
      const loggerData = fs.readFileSync("./logger/logger.json");
      const loggerNewNote = JSON.parse(loggerData);
      loggerNewNote.push(obj);
      fs.writeFileSync("./logger/logger.json", JSON.stringify(loggerNewNote));
    } catch (err) {
      if (err) {
        console.log(err.message);
      }
    }
  }

  _transform(chunk, encoding, done) {
    this.push(chunk);
    done();
  }
}

module.exports = { Logger };
