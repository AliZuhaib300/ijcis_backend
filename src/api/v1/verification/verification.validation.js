const Joi = require('@hapi/joi');

exports.validateVerificationCode = Joi.object({
    user_email: Joi.string().required(),
    phone_number: Joi.string().required(),
    verification_code: Joi.string().required(),
});