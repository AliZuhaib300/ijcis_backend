const Joi = require('@hapi/joi');

exports.validateLoginUserData = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});