// importing modules
const mongoose = require("mongoose");
const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const fs = require("fs-extra");
const path = require("path"); //File System - for file manipulation

require('dotenv').config()

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// create connection to database
// const url =
//   "mongodb+srv://Himanshu-Dewangan:DewaATLAS24@work-assignments.j58q8gb.mongodb.net/Fabrix-assignment?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connect."));

// declare models
const fileNameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

// create reference to model
const fileNameModel = mongoose.model("file_name", fileNameSchema);

// Upload file and file content
router.route("/uploads").post((req, res, next) => {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on("file", function (filename, file, info) {
    console.log("Uploading: " + filename);

    let tempfilename = filename;
    let extension = tempfilename.split(".").slice(-1)[0].toLowerCase();
    console.log(extension);
    if (extension === "glb" || extension === "gltf" || extension === "fbx") {
      let newNameId = {
        name: filename,
      };
      fileNameModel.create(newNameId);

      var uploadParams = {
        Bucket: "3d-models-bucket",
        Key: filename,
        Body: file,
      };
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
        }
      });

      res.status(200).send({ message: "successfully uploaded" });
    } else {
      res
        .status(400)
        .json({
          message:
            "Invalid file extention please upload glb, gltf and fbx files only.",
        });
    }
  });
});

router.route("/file-name").get(async (req, res) => {
  let fileNames = await fileNameModel.find({});
  let fileNameList = [];
  for (let i = 0; i < fileNames.length; i++) {
    fileNameList.push(fileNames[i].name);
  }
  res.status(200).json(fileNameList);
});

module.exports = router;
