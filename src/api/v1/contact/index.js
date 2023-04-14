const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const contactController = require ('./contact.controller');
const auth = require(appRoot + '/src/middleware');

router.get('/all-contacts', contactController.getAllContacts);
router.get('/journal_id/:id', contactController.getContactByJournalId);
router.post('/', contactController.saveContact);
router.patch('/:id', contactController.updateContact);


module.exports = router;