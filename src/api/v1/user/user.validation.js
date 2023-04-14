const Joi = require('@hapi/joi');

exports.validateSignUpUserData = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
});
exports.validateUpdateUser = Joi.object({
    id:Joi.string().required(),
    email: Joi.string().required(),
    user_name:Joi.string().required(),
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
    address:Joi.string().required(),
    city:Joi.string().required(),
    country:Joi.string().required(),
    postal_code:Joi.number().required(),
    about_me:Joi.string().required(),
});


exports.validateGetUserDataById = Joi.object({
    id: Joi.string().required(),
});
