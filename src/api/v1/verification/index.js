const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const VerificationController = require ('./verification.controller');
const auth = require(appRoot + '/src/middleware');

router.post('/', VerificationController.VerifyUser);

module.exports = router;