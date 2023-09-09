// const express = require("express");
// const app = express();
// const readCSVFile = require("./controller/fileReader");
// const cron = require("node-cron");
// const { connection } = require("./middleware/Dbconnection");
// // const { routes } = require("./routes/user");
// const router = require("./routes/user");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const routeUpload = require("./routes/fileUpload");
// const multer = require("multer");
// const routegetUpload = require("./routes/getUploads");
// // const { routes } = require("./routes");

// function activateVirtualEnv() {
//   return new Promise((resolve, reject) => {
//     // Replace '12' with the appropriate Node.js version installed in your environment
//     const nodeVersion = "10";
//     const command = `source /home/cinejqzm/nodevenv/public_html/flyerbd/${nodeVersion}/bin/activate && cd /home/cinejqzm/nodejs/flyerbd`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// function startApp() {
//   cron.schedule("0 0 * * *", () => {
//     // cron.schedule("*/10 * * * * *", () => {
//     readCSVFile();
//   });

//   const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, callback) => {
//       const originalName = file.originalname;
//       callback(null, originalName);
//     },
//   });

//   const upload = multer({ storage: storage });

//   app.use(bodyParser.json()); // Parse JSON bodies
//   app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
//   app.use(cors());
//   app.use("/flyerbd/api/v1/user", router);
//   app.use("/flyerbd/api/v1/upload", upload.single("image"), routeUpload);
//   app.use("/flyerbd/api/v1/img", routegetUpload);

//   const port = 3000;

//   // Connect to the MySQL server
//   // connection.connect((error) => {
//   //   if (error) {
//   //     console.error("Error connecting to MySQL:", error);
//   //   } else {
//   //     console.log("Connected to MySQL server");
//   //   }
//   // });

//   app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });

//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`);
//   });
// }

// activateVirtualEnv()
//   .then(() => startApp())
//   .catch((err) => console.error("Error activating virtual environment:", err));

const express = require("express");
const app = express();
const readCSVFile = require("./controller/fileReader");
const cron = require("node-cron");
const { connection } = require("./middleware/Dbconnection");
const router = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const routeUpload = require("./routes/fileUpload");
const multer = require("multer");
const routegetUpload = require("./routes/getUploads");

cron.schedule("0 0 * * *", () => {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/flyerbd/api/v1/user", router);
app.use("/flyerbd/api/v1/upload", upload.single("image"), routeUpload);
app.use("/flyerbd/api/v1/img", routegetUpload);

const port = 7000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
