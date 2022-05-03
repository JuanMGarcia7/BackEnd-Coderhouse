const { Router } = require("express");

const calc = new Router();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];

const calculate = (n) => {
  let i = 0;
  while (i < n) {
    arr.push(getRandomInt(1, 1000));
    i = i + 1;
  }

  let repeated = {};

  arr.forEach(function (num) {
    repeated[num] = (repeated[num] || 0) + 1;
  });

  return repeated;
};

calc.get("/api/randoms", (req, res) => {
  let quantity = req.params.cant || 100000000;
  const result = calculate(quantity);
  res.send(result);
});

module.exports = calc;
