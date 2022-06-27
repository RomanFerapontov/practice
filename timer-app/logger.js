/* записывает в массив логов результат выполнения
колбек функции таймера. Если есть ошибка,
информация так же записывается*/

function log(timer, a, b) {
  const arr = [];
  for (key in arguments) {
    if (typeof arguments[key] !== "undefined") {
      arr.push(arguments[key]);
    }
  }
  if (typeof timer.job(a, b) === "object" && timer.job(a, b).name === "Error") {
    const logWithError = {
      name: timer.name,
      in: arr.slice(1),
      out: undefined,
      error: timer.job(a, b),
      created: new Date(Date.now()),
    };
    return logWithError;
  } else {
    const logNote = {
      name: timer.name,
      in: arr.slice(1),
      out: timer.job(a, b),
      created: new Date(Date.now()),
    };
    return logNote;
  }
}
module.exports = { log };
