const cron = require("node-cron");
const fs = require("fs");
const csv = require("csv-parser");
const { connection } = require("../../middleware/Dbconnection");
const bcrypt = require("bcrypt");
const User = require("../../schema/User");
const sequelize = require("../../sequelize");

// Define the task to be executed
const readCSVFile = () => {
  // Specify the path to your CSV file
  const filePath =
    "/home/freshaluck/programming/wildfly-22.0.0.Final/kaz/users.csv";

  // Read the CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const { Username, Email, refCode } = row;
      // Access the desired fields (Username, Email, refCode) from each row
      const currentDate = new Date();

      const hash = await bcrypt.hash("cinemasng", 10);

      (async () => {
        try {
          await sequelize.sync(); // Create the table if it doesn't exist (only during development)
          const newUser = {
            username: Username,
            email: Email,
            password: hash,
            refcode: refCode,
            created: new Date(),
            lastlogin: new Date(),
            priv: 3,
          };
          const user = await User.create(newUser);
          console.log("User inserted successfully:", user.toJSON());
        } catch (error) {
          console.error("Error inserting user:", error);
        } finally {
          sequelize.close(); // Close the database connection when done
        }
      })();

      // try {
      //   // Step 1: Check Parent Table (Privilege Table)
      //   const privilegeId = 3; // Replace with the actual privilege ID you want to use
      //   const saltRounds = 10;

      //   // Step 2: Query the Parent Table (Privilege Table)
      //   const checkPrivilegeQuery = "SELECT id FROM priviledge WHERE id = ?";
      //   connection.query(
      //     checkPrivilegeQuery,
      //     [privilegeId],
      //     (error, results) => {
      //       if (error) {
      //         console.error("Error querying privilege table:", error);
      //         // connection.end();
      //         return;
      //       }

      //       if (results.length === 0) {
      //         console.error("Privilege with the given ID does not exist.");
      //         // connection.end();
      //         return;
      //       }

      //       // Step 3: Use Transactions
      //       connection.beginTransaction((error) => {
      //         if (error) {
      //           console.error("Error starting transaction:", error);
      //           // connection.end();
      //           return;
      //         }

      //         bcrypt.hash("cinemasng", saltRounds, (err, hash) => {
      //           if (err) {
      //             console.error("Error hashing password:", err);
      //             // connection.rollback(() => connection.end());
      //             return;
      //           }

      //           // Perform the INSERT query inside the transaction
      //           const insertUserQuery =
      //             "INSERT INTO user (username, email, password, refcode, created, lastlogin, priv) VALUES (?, ?, ?, ?, ?, ?, ?)";
      //           connection.query(
      //             insertUserQuery,
      //             [
      //               Username,
      //               Email,
      //               hash,
      //               refCode,
      //               currentDate,
      //               currentDate,
      //               privilegeId,
      //             ],
      //             (error, results) => {
      //               if (error) {
      //                 console.error("Error inserting user:", error);
      //                 // connection.rollback(() => connection.end());
      //               } else {
      //                 connection.commit((error) => {
      //                   if (error) {
      //                     console.error("Error committing transaction:", error);
      //                     // connection.rollback(() => connection.end());
      //                   } else {
      //                     console.log("User inserted successfully.");
      //                     // connection.end();
      //                   }
      //                 });
      //               }
      //             }
      //           );
      //         });
      //       });
      //     }
      //   );
      // } catch (error) {
      //   console.error("Unexpected error:", error);
      //   connection.end();
      // }

      // const privData = 3;

      // const saltRounds = 10; // Number of salt rounds (higher value means slower hashing but more secure)

      // const hash = await bcrypt.hash("cinemasng", saltRounds);

      // const query = `INSERT INTO user (username, email, password, refcode, created, lastlogin, priv)
      //              VALUES (?, ?, ?, ?, ?, ?, ?)`;

      // await new Promise((resolve, reject) => {
      //   connection.query(
      //     query,
      //     [Username, Email, hash, refCode, currentDate, currentDate, privData],
      //     (error, results) => {
      //       if (error) reject(error);
      //       else resolve(results);
      //     }
      //   );
      // });

      // connection.end();
      // console.log("User inserted successfully.");

      // Hash the password
      // bcrypt.hash("cinemasng", saltRounds, (err, hash) => {
      //   // Handle the result or error
      //   connection.query(
      //     "INSERT INTO user (username, email, password, refcode, created, lastlogin, priv) VALUES (?, ?, ?, ?, ?, ?, ?)",
      //     [Username, Email, hash, refCode, currentDate, currentDate, 3],
      //     (error, results) => {
      //       if (error) {
      //         console.error("Error executing query:", error);
      //       } else {
      //         console.log("Query results:", results);
      //       }
      //     }
      //   );
      // });
    })
    .on("end", () => {
      console.log("CSV file reading completed.");
    });
};

module.exports = readCSVFile;

// cron.schedule("*/10 * * * * *", () => {
//   readCSVFile();
// });

// Schedule the task to run at 12:00 AM every day
// cron.schedule('0 0 * * *', () => {
//   readCSVFile();
// });
