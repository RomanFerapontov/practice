// Приложение: Менеджер таймеров.

/* Таймеры могут быть как одноразовыми (выполнить задачу через определённый
промежуток времени), так и периодическими (выполнять задачу с определённым
интервалом). Если interval = true — таймер периодический. */

const errors = require("./errors");
const log = require("./logger");

class TimeManager {
  constructor() {
    this.timers = [];
    this.timerOn = false;
    this.logger = [];
    this.timeMs = [];
  }

  /* Метод add() добавляет таймер в очередь
  на выполнение, проверяет наличие ошибок.
  И записывает данные в логгер. */

  add(timer, a, b) {
    errors.checkError(timer, this.timers);

    const addTimer = () => {
      this.timeMs.push(timer.delay);
      if (timer.interval === true) {
        return setInterval(timer.job, timer.delay, a, b);
      } else if (timer.interval === false) {
        return setTimeout(timer.job, timer.delay, a, b);
      }
    };
    this.timers.push({
      timerName: timer.name,
      timerFunc: addTimer,
      timerRun: null,
    });
    this.logger.push(log.log(timer, a, b));
    return this;
  }

  // remove() останавливает определённый таймер и удаляет его из очереди.

  remove(timer) {
    this.pause(timer);
    this.timers = this.timers.filter((el) => {
      if (timer.name !== el.timerName) {
        return el;
      }
      this.timerOn = false;
    });
  }

  // start() запускает все таймеры на выполнение.

  start() {
    this.timerOn = true;
    this.timers.map((el) => {
      el.timerRun = el.timerFunc();
    });
  }

  // stop() останавливает все таймеры.

  stop(ms) {
    const timerStop = () => {
      this.timers.forEach((el) => {
        clearInterval(el.timerRun) || clearTimeout(el.timerRun);
        this.timerOn = false;
      });
    };
    setTimeout(timerStop, ms);
  }

  // pause() приостанавливает работу конкретного таймера.

  pause(timer) {
    this.timers.forEach((el) => {
      if (timer.name === el.timerName) {
        clearInterval(el.timerRun) || clearTimeout(el.timerRun);
      }
    });
  }

  // resume() запускает работу конкретного таймера.

  resume(timer) {
    this.timers.map((el) => {
      if (timer.name === el.timerName) {
        el.timerFunc();
      }
    });
  }

  // print() возвращает массив всех логов.

  print() {
    console.log(this.logger);
  }
}

const manager = new TimeManager();

const t1 = {
  name: "t1",
  delay: 1000,
  interval: true,
  job: (a) => {
    return a;
  },
};

const t2 = {
  name: "t2",
  delay: 3000,
  interval: false,
  job: (a, b) => {
    return a + b;
  },
};

const t3 = {
  name: "t3",
  delay: 5000,
  interval: false,
  job: () => {
    try {
      throw new Error("We have a problem!");
    } catch (err) {
      return { name: err.name, message: err.message };
    }
  },
};

manager.add(t1, 1).add(t2, 1, 2).add(t3);
// manager.remove();
// console.log(process.pid);
// manager.remove(t2);
manager.start();
// manager.remove(t1);
manager.stop(5000);
// manager.pause(t1);
// manager.resume(t1);
// manager.stop(3000);
manager.print();
