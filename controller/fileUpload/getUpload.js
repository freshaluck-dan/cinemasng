const fs = require("fs");
const path = require("path");

async function getImage(req, res) {
  const imageName = req.body.image; // Retrieve the image name from the request parameters
  console.log(imageName);
  // const imagePath = path.join(__dirname, "uploads/", imageName); // Set the path to the image file
  const filePath =
    "/home/freshaluck/programming/personalWork/cinemasngBackend/uploads/" +
    imageName;
  const imagePath = path.resolve(filePath);

  fs.readFile(imagePath, (error, data) => {
    if (error) {
      console.error("Error reading image file:", error);
      res.status(404).json({ error: "Image not found" });
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" }); // Set the appropriate content type for your image
      res.end(data);
    }
  });
}

module.exports = getImage;
