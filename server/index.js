// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(cors());
const multer = require("multer");

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: "./build/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(__dirname + "/../build/uploads"));

// Route for file upload
app.post("/api/uploadfile", upload.single("myFile"), (req, res, next) => {
  console.log(req.file.originalname + " file successfully uploaded!!");
  res.sendStatus(200);
});

app.delete("/api/deletefile/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../build/uploads", filename);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.status(500).send("Error deleting file");
      } else {
        console.log(`${filename} deleted successfully.`);
        res.sendStatus(200);
      }
    });
  });

app.listen(3000, () => console.log("Listening on port 3000"));
