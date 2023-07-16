async function fileUpload(req, res) {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
  } else {
    // Process the uploaded file
    // You can access the file using req.file

    res
      .status(200)
      .json({ message: "File uploaded successfully", error: false });
  }
}

module.exports = {
  fileUpload,
};
