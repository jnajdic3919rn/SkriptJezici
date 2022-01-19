const Joi = require('@hapi/joi');

const messageSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    body: Joi.string().min(8).max(120).required(),
})


module.exports = {
    messageSchema : messageSchema,
}