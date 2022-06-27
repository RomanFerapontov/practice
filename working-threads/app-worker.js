const { Worker } = require("worker_threads");
const factorial = require("./factorial.js");

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: { array },
    });

    worker.on("message", (msg) => {
      console.log(worker.threadId);
      resolve(msg);
    });
    worker.on("error", (err) => {
      reject(err);
    });
    worker.on("exit", () => {
      console.log("Завершил работу");
    });
  });
};

const main = async () => {
  performance.mark("start");
  const result = await Promise.all([
    compute([25, 35, 40, 44]),
    compute([25, 35, 40, 44]),
    compute([25, 35, 40, 44]),
    compute([25, 35, 40, 44]),
    compute([25, 35, 40, 44]),
  ]);
  console.log(result);

  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main"));
};

main();
