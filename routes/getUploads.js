const express = require("express");
const getImage = require("../controller/fileUpload/getUpload");
const routegetUpload = express.Router();

routegetUpload.get("/get/flier", getImage);

module.exports = routegetUpload;
