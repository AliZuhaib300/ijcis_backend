const Joi = require('@hapi/joi');

exports.validateGetContactByJournalId = Joi.object({
    id: Joi.string().required(),
});
exports.validateSaveContact = Joi.object({
    journal_id: Joi.string().required(),
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
    affiliation:Joi.string().required(),
    address:Joi.string().required(),
});
