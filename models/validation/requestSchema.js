const Joi = require('@hapi/joi');

const requestSchema = Joi.object({
    title: Joi.string().min(6).max(30).required(),
    description: Joi.string().min(10).max(200).required(),
})

module.exports = {
   requestSchema : requestSchema,
}