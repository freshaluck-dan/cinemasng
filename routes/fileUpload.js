const express = require("express");
const { fileUpload, getImage } = require("../controller/fileUpload");
const routeUpload = express();

routeUpload.post("/image", fileUpload);

module.exports = routeUpload;
