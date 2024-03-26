const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload/csv");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now().toString() +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname)
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["text/csv"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );
    if (extensaoImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
