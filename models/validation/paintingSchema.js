const Joi = require('@hapi/joi');

const paintingSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    artist: Joi.string().min(2).max(20).required(),
    year: Joi.number().required(),
    description: Joi.string().min(10).max(120).required(),
})

module.exports = {
    paintingSchema : paintingSchema,
}