/* Приложение: Модуль шифрования данных клиента.
Реализовано через потоки. */

const { AccountManager } = require("./account.manager.js");
const { Guardian } = require("./guardian.js");
const { Ui } = require("./ui.js");
const { Logger, DB } = require("./logger/logger.js");

const customers = [
  { name: "Ivan Ivanov", email: "ivanov@email.com", password: "ivanov_123" },
  { name: "Petr Petrov", email: "petrov@email.com", password: "petrov_456" },
];

const ui = new Ui(customers);
const guardian = new Guardian();
const manager = new AccountManager();
const logger = new Logger();

ui.pipe(guardian).pipe(logger).pipe(manager);
// получение данных - шифрование - запись в базу - вывод в консоль
