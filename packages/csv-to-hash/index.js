"use strict";

const fs = require("fs");
const csvSync = require("csv-parse/lib/sync"); // requiring sync module

const file = "data.csv";
let data = fs.readFileSync(file);

let res = csvSync(data);

const result = {};

res.forEach((d) => {
  result[d[0]] = Number(d[1]);
});

console.log(result);
