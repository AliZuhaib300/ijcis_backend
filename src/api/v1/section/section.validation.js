const Joi = require('@hapi/joi');

exports.validateGetSectionByJournalId = Joi.object({
    id: Joi.string().required(),
});
exports.validateSaveSection = Joi.object({
    title: Joi.string().required(),
    journal_id: Joi.string().required(),
});
exports.validateUpdateSection = Joi.object({
    id:Joi.string().required(),
    section_title:Joi.string().required(),
    abbreviation:Joi.string().required(),
    policy:Joi.string().required(),
    word_count:Joi.string().required(),
    options:Joi.any().optional(),
    identify:Joi.string().required(),
    section_editors:Joi.any().optional(),
});
exports.validateSectionById = Joi.object({
    id: Joi.string().required(),
});