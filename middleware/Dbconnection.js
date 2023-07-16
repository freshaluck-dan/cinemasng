const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Replace with your MySQL server host
  user: "root", // Replace with your MySQL username
  password: "freshaluck", // Replace with your MySQL password
  database: "cinemasng", // Replace with your MySQL database name
});

module.exports = {
  connection,
};

// const { MongoClient } = require("mongodb");

// // Replace 'your_mongodb_uri' with the actual connection string to your MongoDB database.
// const uri = "mongodb://localhost:27017/cinemasng";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // async function connection() {
// //   try {
// //     // Create a new MongoClient
// //     const client = new MongoClient(uri, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });

// //     // Connect to the MongoDB server
// //     // await client.connect();

// //     // console.log("Connected to MongoDB");

// //     // Perform operations on the database
// //     const database = client.db();

// //     // Example: Query all documents from a collection
// //     // const collection = database.collection('your_collection');
// //     // const documents = await collection.find({}).toArray();
// //     // console.log('Documents:', documents);

// //     // Close the connection when done
// //     // client.close();
// //     // console.log('Disconnected from MongoDB');
// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error);
// //   }
// // }

// // Call the function to connect to the database and perform operations.
// // connectToDatabase();
// module.exports = {
//   client,
// };
