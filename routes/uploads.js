const router = require('express').Router();
const { uploadImage } = require('../controller/uploadController');
const multer = require('../utils/multer');

router.post('/upload', multer.single("image"), uploadImage);

module.exports = router;