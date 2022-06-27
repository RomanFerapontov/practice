const { Transform } = require("stream");
const crypto = require("crypto");
const { promisify } = require("util");

// класс Guardian шифрует данные.

class Guardian extends Transform {
  constructor(
    options = {
      objectMode: true,
      readableObjectMode: true,
      decodeStrings: false,
    }
  ) {
    super(options);
  }

  encrypt(data) {
    const key = crypto.scryptSync(data, "salt", 32);
    const iv = crypto.randomBytes(8).toString("hex");

    const cypher = crypto.createCipheriv("aes256", key, iv);
    let encrypted = cypher.update(data, "utf-8", "hex");

    encrypted += cypher.final("hex");
    return encrypted;
  }

  _transform(chunk, encoding, done) {
    const encodeData = {
      meta: { source: "ui" },
      payload: {
        name: `${chunk.name}`,
        email: this.encrypt(`${chunk.email}`),
        password: this.encrypt(`${chunk.password}`),
      },
    };
    this.push(encodeData);
    done();
  }
}

module.exports = { Guardian };
