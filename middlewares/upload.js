const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "text/csv") {
            cb(null, true);
        } else {
            console.log("Only csv file needed to be attached !");
            cb(null, false);
        }
    },
    limits: function (req, file, cb) {
        fileSize: 1024 * 1024 * 10
        // Limit 10MB file
    }
});

module.exports = upload