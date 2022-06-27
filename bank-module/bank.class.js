const { EventEmitter } = require("events");

class Bank extends EventEmitter {
  constructor() {
    super();
    this.usersData = [];
  }

  /*Метод register() принимает объект с данными клиента
и выводит ошибку при добавлении клиента с именем, которое
уже есть в базе. Метод так же присваивает идентификатор клиента
и записывает в базу данных.*/

  register(userData) {
    if (userData.balance <= 0) {
      return this.error(`User ${userData.name} has ${userData.balance}$.`);
    }

    const checkUsers = this.usersData.filter((el) => {
      if (userData.name === el.name) {
        return el;
      }
    });
    if (checkUsers.length > 0) {
      return this.error(`User ${userData.name} has already added.`);
    } else {
      const id = Buffer.from(`${userData.name}`).toString("base64");
      userData.id = id;
      this.usersData.push(userData);
      return id;
    }
  }

  /*Метод error() принимает сообщение об ошибке
  и эмитит событие "error"*/

  error(message) {
    this.emit("error", new Error(message));
  }

  /*Метод findUser() ищет клиента в базе и проверяет подлинность идентификатора.*/

  findUser(id) {
    const arrID = this.usersData.map((el) => {
      return el.id;
    });

    if (arrID.includes(id)) {
      for (this.el of this.usersData) {
        if (id === this.el.id) {
          return this.el;
        }
      }
    } else if (!arrID.includes(id)) {
      this.error(`Incorrect ID: ${id}`);
      return {};
    }
  }
}

module.exports = { Bank };
