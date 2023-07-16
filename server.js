const express = require("express");
const app = express();
const readCSVFile = require("./controller/fileReader");
const cron = require("node-cron");
const { connection } = require("./middleware/Dbconnection");
// const { routes } = require("./routes/user");
const router = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const routeUpload = require("./routes/fileUpload");
const multer = require("multer");
const routegetUpload = require("./routes/getUploads");
// const { routes } = require("./routes");

cron.schedule("0 0 * * *", () => {
  // cron.schedule("*/10 * * * * *", () => {
  readCSVFile();
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    callback(null, originalName);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());
app.use("/api/v1/user", router);
app.use("/api/v1/upload", upload.single("image"), routeUpload);
app.use("/api/v1/img", routegetUpload);

const port = 3000;

// Connect to the MySQL server
// connection.connect((error) => {
//   if (error) {
//     console.error("Error connecting to MySQL:", error);
//   } else {
//     console.log("Connected to MySQL server");
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
