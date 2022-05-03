const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    logerrError: { type: "file", filename: "error.log" },
    loggerWarn: { type: "file", filename: "warn.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "debug" },
    archivo: { appenders: ["loggerWarn"], level: "warn" },
    archivo2: { appenders: ["miLoggerConsole"], level: "info" },
    todos: { appenders: ["miLoggerConsole", "logerrError"], level: "error" },
  },
});
//VER PORQUE NO ME PRINTEA

const logger = log4js.getLogger();

module.exports = logger;
