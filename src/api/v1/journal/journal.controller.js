const appRoot = require('app-root-path');
const Journal = require(appRoot + '/src/model/journal');
const journalValidation = require('./journal.validation');
const logger = require(appRoot + '/src/logger').apiLogger;



exports.getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.find();
        return res.status(202).json({
            data: journals,
            message: 'All journals found'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}

exports.saveJournal = async (req, res) => {
    try {
        const body = ({
            journal_title,
            journal_initials,
            journal_abbreviation,
            publisher,
            journal_issn,
            journal_editor,
        } = req.body);
        logger.info('In journal - Validating journal data');
        const {error} = journalValidation.validateJournal.validate(body, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        const journal = await Journal.create(req.body);
        return res.status(202).json({
            data: journal,
            message: 'Data saved successfully'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}

exports.publishJournal = async (req, res) => {
    try {
        const body = ({
            journal_id,
        } = req.body);
        const updateBody = {
            is_published: true,
        }
        const journal = await Journal.findByIdAndUpdate({ _id: journal_id }, updateBody, {
            new: true,
        });
        return res.status(202).json({
            message: 'Data Updated successfully',
            data: journal,
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}

exports.getJournalById = async (req, res) => {
    try {
        logger.info('In getJournalById - Validating  journal input data');
        const {error} = journalValidation.validateGetJournalById.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        logger.info('All validations passed');
        const journal = await Journal.findById(req.params.id);
        // const journal = await Journal.findAll({
        //     journal_id: journal_id,
        // })
        if (!journal) {
            return res.status(404).json({
                message: 'Journal not found'
            });
        }
        return res.status(200).json({
            message: 'Journal found',
            data: journal,
        });
    } catch (error) {
        console.log('error')
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

exports.getJournalByUserId = async (req, res) => {
    try {

        const { id } = req.params;
        logger.info('In getJournalByUserId - Validating  journal input data');
        const {error} = journalValidation.validateGetJournalById.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        console.log('req.query', req.query);
        console.log('req.params', req.params);
        logger.info('All validations passed');
        const journals = await Journal.find({
            user_id: id,
        });
        console.log('journals', journals);
        if (!journals) {
            return res.status(404).json({
                message: 'Journals not found'
            });
        }
        return res.status(200).json({
            message: 'Journals found',
            data: journals,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}
exports.delJournalById = async (req, res) => {
    try {
        logger.info('In delJournalByUserId - Deleting journal input data');
        const {error} = journalValidation.validateDelJournalById.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        logger.info('All validations passed');
        await Journal.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: 'Journal Deleted',
        });
    } catch (error) {
        console.log('error')
        return res.status(500).json({
            message: 'Server error'
        })
    }
}
