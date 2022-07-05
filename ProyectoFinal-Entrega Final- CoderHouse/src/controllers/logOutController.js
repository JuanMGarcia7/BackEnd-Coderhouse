const logger = require("../logs/logs.js");

const getLogOut = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/home");
  });
};

module.exports = { getLogOut };
