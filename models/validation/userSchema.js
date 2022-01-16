const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
})

const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`
      }),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().lowercase().required(),
})

module.exports = {
    authSchema : authSchema,
    registerSchema : registerSchema
}