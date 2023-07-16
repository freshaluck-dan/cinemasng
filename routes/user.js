const express = require("express");
const { getUser } = require("../controller/User");
const route = express();

route.post("/getuser", getUser);

module.exports = route;
