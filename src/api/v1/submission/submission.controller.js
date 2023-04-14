const appRoot = require('app-root-path');
const Files = require(appRoot + '/src/model/file');
const submissionValidation = require('./submission-validation');
const logger = require(appRoot + '/src/logger').apiLogger;


exports.getFilesByJournalId = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info('In getJournalByUserId - Validating  journal input data');
        logger.info('All validations passed');
        const files = await Files.find({
            journal_id: id,
        }).populate('journal_id');
        return res.status(200).json({
            message: 'Files found',
            data: files,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}

exports.uploadSubmissionFiles = async (req, res) => {
    try {
        logger.info('All validations passed');
        const files = await Files.create(req.body);
        return res.status(200).json({
            message: 'Files saved',
            data: files,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}