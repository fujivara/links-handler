const express = require('express');
const urlControllers = require('../controllers/LinkControllers');

const router = express.Router();

router.route('/createLink').post(urlControllers.createUrl);

router.route('/:shortUrl').get(urlControllers.getShortUrl);

module.exports = router;
