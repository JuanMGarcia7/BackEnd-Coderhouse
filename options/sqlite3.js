const sql3 = {
  client: "sqlite3",
  connection: {
    filename: `${__dirname}/DB/mydb.sqlite`,
  },
  useNullAsDefault: true,
};

module.exports = {
  sql3,
};
