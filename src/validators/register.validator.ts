import * as Joi from 'joi';

export const registeralidator = Joi.object({
    username: Joi.string().min(1).email().required(),
    password: Joi.string().min(5).required(),
}).unknown();
