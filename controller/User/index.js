const { connection } = require("../../middleware/Dbconnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getUser(req, res) {
  const { email } = req.body;

  // const secret = process.env.SECRET_KEY;
  const secret = "23456789IJHBH@#!^&%%%SDLJGSJHKDN=#$%LAKA";

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "An error occurred while executing the query" });
      } else {
        console.log("Query results:", results[0]);

        data = {};
        data["data"] = results[0];
        let payload = {
          priv: data.priv,
          email: data.email,
          refCode: data.refCode,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        data["token"] = token; // 0 for user, 1 for admins

        console.log(token);
        res.status(200).json(data);
      }

      // Release the connection back to the pool
      // connection.release();
    }
  );
}

module.exports = {
  getUser,
};
