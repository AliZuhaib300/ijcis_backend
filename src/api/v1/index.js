const express = require('express');
const router = express.Router();
const user = require ('./user');
const login = require('./login');
const verification = require('./verification');
const journal = require ('./journal');
const contact = require ('./contact');
const section = require('./section');
const submission = require('./submission')

router.use('/user', user);
router.use('/login', login);
router.use('/verification',verification);
router.use('/journal',journal);
router.use('/contact',contact);
router.use('/section',section);
router.use('/submission', submission);

module.exports = router;