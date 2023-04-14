const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const submissionController = require ('./submission.controller');
const auth = require(appRoot + '/src/middleware');

router.get('/files-journal_id/:id', submissionController.getFilesByJournalId);
//
// router.post('/', submissionController.savesubmission);
//
// router.patch('/:id', submissionController.updatesubmission);
//
// router.get('/:id', submissionController.getsubmissionById);
router.post('/upload-files', submissionController.uploadSubmissionFiles);

module.exports = router;