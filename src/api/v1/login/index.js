const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const loginController = require ('./login.controller');
const auth = require(appRoot + '/src/middleware');

router.post('/', loginController.createLogin);
router.post('/forgot-pass', loginController.forgotPassword);
router.post('/update-pass', loginController.UpdatePassword);

module.exports = router;