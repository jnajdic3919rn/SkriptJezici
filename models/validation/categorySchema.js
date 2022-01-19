const Joi = require('@hapi/joi');

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    century: Joi.string().alphanum().min(1).max(10).required(),
    description: Joi.string().min(10).max(120).required(),
})

module.exports = {
    categorySchema : categorySchema,
}