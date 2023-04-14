const appRoot = require('app-root-path');
const Section = require(appRoot + '/src/model/section');
const sectionValidation = require('./section.validation');
const logger = require(appRoot + '/src/logger').apiLogger;

exports.getAllSections = async (req, res) => {
    try {
        const sections = await Section.find();
        return res.status(202).json({
            data: sections,
            message: 'All sections found'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}
exports.getSectionByJournalId = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info('In getJournalByUserId - Validating  journal input data');
        const {error} = sectionValidation.validateGetSectionByJournalId.validate(req.params, {
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
        const section = await Section.find({
            journal_id: id,
        });
        console.log('section', section);
        if (!section) {
            return res.status(404).json({
                message: 'Journal Id not found'
            });
        }
        return res.status(200).json({
            message: 'Journal Id found',
            data: section,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}
exports.saveSection = async (req, res) => {
    try {
        const body = ({
            title,
            journal_id,
        } = req.body);
        logger.info('In createSection - Validating Journal input data');
        const {error} = sectionValidation.validateSaveSection.validate(body, {
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
        const section = await Section.create(req.body);
        return res.status(202).json({
            data: section,
            message: 'Data saved successfully'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}
exports.updateSection = async (req, res) => {
    try {
        const body = ({
            section_title,
            abbreviation,
            policy,
            word_count,
            options,
            identify,
            section_editors,
        } = req.body);
        body.id = req.params.id;
        logger.info('In createSection - Validating  section input data');
        const {error} = sectionValidation.validateUpdateSection.validate(body, {
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
        const sectionBody = {
            section_title,
            abbreviation,
            policy,
            word_count,
            options,
            identify,
            section_editors,
        }
        const section = await Section.findByIdAndUpdate({ _id: req.params.id }, sectionBody, {
            new: true,
        });
        logger.info('Returning back User data with success code 200');
        return res.status(202).json({
            data: section,
            message: 'section updated successfully'
        });
    } catch (error) {
        console.log('error')
        return res.status(500).json({
            message: 'Server error'
        })
    }
}
exports.getSectionById = async (req, res) => {
    try {
        logger.info('In getSectionById - Validating  section input data');
        const {error} = sectionValidation.validateSectionById.validate(req.params, {
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
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }
        return res.status(200).json({
            message: 'Section found',
            data: section,
        });
    } catch (error) {
        console.log('error')
        return res.status(500).json({
            message: 'Server error'
        })
    }
}
