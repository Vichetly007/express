const multer = require("multer");
const fs = require("fs");
// import * as fs from 'node:fs';

const Config = {
  image_path: "/Applications/XAMPP/xamppfiles/htdocs/Express/",
};

// create function remove file in Node.js
const removeFile = async (fileName) => {
  var filePath = Config.image_path + fileName;

  try {
    return fs.unlinkSync(filePath);
  } catch (err) {
    return false;
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, Config.image_path);
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype != "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      // not allow
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

module.exports = {
  Config,
  upload,
  removeFile,
};
