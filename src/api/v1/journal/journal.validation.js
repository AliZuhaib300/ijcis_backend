const Joi = require('@hapi/joi');
exports.validateJournal= Joi.object({
    user_id:Joi.string().required(),
    journal_title:Joi.string().required(),
    journal_initials:Joi.string().required(),
    journal_abbreviation:Joi.string().required(),
    publisher:Joi.string().required(),
    journal_issn:Joi.string().required(),
    journal_editor:Joi.string().required(),
});

exports.validateGetJournalById = Joi.object({
    id: Joi.string().required(),
});
exports.validateDelJournalById = Joi.object({
    id: Joi.string().required(),
});
