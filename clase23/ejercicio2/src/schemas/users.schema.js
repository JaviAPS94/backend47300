import Joi from 'joi';

const postSchema = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required()
});

const getByIdSchema = Joi.object({
    id: Joi.number().integer().required()
})

export {
    postSchema,
    getByIdSchema
}