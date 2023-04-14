const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const sectionController = require ('./section.controller');
const auth = require(appRoot + '/src/middleware');

router.get('/all-sections', sectionController.getAllSections);

router.get('/journal_id/:id', sectionController.getSectionByJournalId);

router.post('/', sectionController.saveSection);

router.patch('/:id', sectionController.updateSection);

router.get('/:id', sectionController.getSectionById);

module.exports = router;