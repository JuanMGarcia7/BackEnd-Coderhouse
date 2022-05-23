const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "debug" },
    archivo: { appenders: ["miLoggerConsole"], level: "warn" },
    archivo2: { appenders: ["miLoggerConsole"], level: "info" },
    todos: { appenders: ["miLoggerConsole"], level: "error" },
  },
});

const logger = log4js.getLogger();
module.exports = logger;
