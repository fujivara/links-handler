const express = require('express');
const urlControllers = require('../controllers/LinkControllers');
const { protectAuth } = require('../middleware/protectAuth');

const router = express.Router();

router.use(protectAuth);

router.route('/getUrls').get(urlControllers.getAllUserLinks);

router.route('/addUrl').patch(urlControllers.createUserUrl);

module.exports = router;
