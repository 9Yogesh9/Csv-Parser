const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const detailsController = require('../controllers/detailsController');

// Multiparty used as middleware
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

router.get('/', homeController.home);
router.post('/get_file', multipartMiddleware, homeController.get_file);
router.get('/getDetails/:id', detailsController.showDetails);
router.get('/deleteFile/:id', detailsController.deleteFile);

module.exports = router;