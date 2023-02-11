const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const detailsController = require('../controllers/detailsController');

// CSV parser used as middleware
const upload = require('../middlewares/upload');

router.get('/', homeController.home);
router.post('/get_file', upload.single('uploaded_file'), homeController.get_file);
router.get('/getDetails/:id', detailsController.showDetails);
router.get('/deleteFile/:id', detailsController.deleteFile);

module.exports = router;