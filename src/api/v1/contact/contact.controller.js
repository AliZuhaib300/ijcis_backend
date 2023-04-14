const appRoot = require('app-root-path');
const Contact = require(appRoot + '/src/model/contact');
const contactValidation = require('./contact.validation');
const logger = require(appRoot + '/src/logger').apiLogger;

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(202).json({
            data: contacts,
            message: 'All contacts found'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}
exports.getContactByJournalId = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info('In getJournalByUserId - Validating  journal input data');
        const {error} = contactValidation.validateGetContactByJournalId.validate(req.params, {
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
        const contact = await Contact.findOne({
            journal_id: id,
        });
        console.log('contact', contact);
        if (!contact) {
            return res.status(404).json({
                message: 'Journal Id not found'
            });
        }
        return res.status(200).json({
            message: 'Journal Id found',
            data: contact,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}
exports.saveContact = async (req, res) => {
    try {
        const body = ({
            name,
            email,
            phone,
            affiliation,
            address,
            journal_id,
        } = req.body);
        logger.info('In createContact - Validating Journal input data');
        const {error} = contactValidation.validateSaveContact.validate(body, {
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
        const contact = await Contact.create(req.body);
        return res.status(202).json({
            data: contact,
            message: 'Data saved successfully'
        });
    }catch (error) {
        console.log('error')
        return res.create(500).json({
            message: 'Server error'
        })
    }
}

exports.updateContact = async (req, res) => {
    try {
        const body = ({
            name,
            email,
            phone,
            affiliation,
            address,
            journal_id,
        } = req.body);
        logger.info('In createSection - Validating  section input data');
        const section = await Contact.findByIdAndUpdate({ _id: req.params.id }, body, {
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