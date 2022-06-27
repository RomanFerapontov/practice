/* checkError() вызывает ошибку, если:

- поле name содержит неверный тип, отсутствует или пустая строка.
- поле delay содержит неверный тип или отсутствует.
- delay меньше 0 и больше 5000.
- поле interval содержит неверный тип или отсутствует.
- поле job содержит неверный тип или отсутствует.
- запустить метод add после старта.
- попытаться добавить таймер с именем, котрое уже было добавлено. */

function checkError(timer, array) {
  if (typeof timer.name !== "string") {
    throw new Error(
      `НЕВЕРНЫЙ ФОРМАТ ДАННЫХ:${timer.name}. Имя таймера должно быть строкой.`
    );
  } else if (typeof timer.delay !== "number") {
    throw new Error(
      `НЕВЕРНЫЙ ФОРМАТ ДАННЫХ: ${timer.delay}. Время таймера должно быть указано в миллисекундах.`
    );
  } else if (typeof timer.job !== "function") {
    throw new Error(
      `НЕВЕРНЫЙ ФОРМАТ ДАННЫХ: ${timer.job}. Свойство передавать функцию.`
    );
  } else if (typeof timer.interval !== "boolean") {
    throw new Error(
      `НЕВЕРНЫЙ ФОРМАТ ДАННЫХ: ${timer.interval}. Свойство должно быть true или false.`
    );
  } else if (timer.delay < 0 || timer.delay > 5000) {
    throw new Error(
      `ЗАДАНО НЕВЕРНОЕ ВРЕМЯ ТАЙМЕРА: ${timer.delay}. Время должно быть от 0 до 5000 миллисекунд.`
    );
  } else if (this.timerOn) {
    throw new Error(
      `ОШИБКА ДОБАВЛЕНИЯ ТАЙМЕРА. Добавть новый таймер можно после завершения текущего.`
    );
  }
  array.forEach((el) => {
    if (timer.name === el.timerName) {
      throw new Error(
        `ОШИБКА ДОБАВЛЕНИЯ ТАЙМЕРА. Таймер с таким именем '${timer.name}' уже существует.`
      );
    }
  });
}

module.exports = { checkError };
