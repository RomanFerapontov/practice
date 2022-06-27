/* 
Модуль управления банком.
*/

const { Bank } = require("./bank.class.js");
const bank = new Bank();

// Обработка ошибок реализована с помощью события "error".

bank.on("error", (error) => {
  if (error.name === "Error") {
    console.log(error.message);
  }
});

/* Событие "add" принимает ID клиента, сумму зачисления
и добавляет деньги на счёт клиента. Зачислить 0
или отрицательную сумму нельзя.*/

bank.on("add", (userID, addMoney) => {
  const userData = bank.findUser(userID);
  if (addMoney <= 0) {
    bank.error(`You add "0" or negative value of money.`);
  } else {
    userData.balance += addMoney;
  }
});

/* Событие "get" принимает ID клиента и выводит баланс на его счету.*/

bank.on("get", (userID) => {
  const userData = bank.findUser(userID);
  console.log(`${userData.name} have ${userData.balance}$.`);
});

/* Событие "withdraw" принимает  ID клиента, сумму списания
и списывает деньги с его счёта. Нельзя списать отрицательную сумму.
Нельзя списать сумму, которая создаст отрицательный баланс клиента.*/

bank.on("withdraw", (userID, withdrawMoney) => {
  const userData = bank.findUser(userID);
  if (withdrawMoney < 0) {
    bank.error(`You withdraw negative value of money.`);
  } else {
    if (userData.balance - withdrawMoney < 0) {
      bank.error("Not enough money for withdraw.");
    } else {
      userData.balance -= withdrawMoney;
    }
  }
});

/* Событие "send" принимает ID отправителя и ID получателя,
а так же сумму перевода. Сумма перевода не может быть 0 или отрицательной.*/

bank.on("send", (senderId, recipientId, moneyToSend) => {
  if (moneyToSend <= 0) {
    return bank.error(`Cannot send ${moneyToSend}$`);
  }

  const senderData = bank.findUser(senderId);
  const recipientData = bank.findUser(recipientId);

  if (
    Object.values(senderData).length !== 0 &&
    Object.values(recipientData).length !== 0
  ) {
    if (senderData.balance - moneyToSend > 0) {
      bank.emit("withdraw", senderId, moneyToSend);
      bank.emit("add", recipientId, moneyToSend);
    } else {
      bank.error(
        `Sender's balance will be ${senderData.balance - moneyToSend}$`
      );
    }
  }
});

const personFirstId = bank.register({ name: "Jack Olsen", balance: 100 });
const personSecondId = bank.register({ name: "Sarah Piterson", balance: 450 });

// const personThirdId = bank.register({ name: "Sarah Piterson", balance: 200 }) // Error

bank.emit("add", personFirstId, 50); // { name: "Jack Olsen", balance: 150 }
bank.emit("get", personFirstId); // Jack Olsen have 150$.
bank.emit("withdraw", personSecondId, 160); // { name: "Sarah Piterson", balance: 290 }

// bank.emit("send", personFirstId, personSecondId, 160); // Error

bank.emit("send", personFirstId, personSecondId, 100);
// { name: 'Jack Olsen', balance: 50}
// { name: 'Sarah Piterson', balance: 390}

// bank.emit("send", "I345kJsLl31", personSecondId, 100); // Error
