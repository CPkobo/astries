const readdirSync = require("fs").readdirSync
console.log(readdirSync("contents").filter(val => val.endsWith(".yaml")))