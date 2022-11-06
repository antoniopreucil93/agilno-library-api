import * as Joi from 'joi';

const bookCreateValidator = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(15).required(),
}).unknown();

const bookUpdateValidator = Joi.object({
    title: Joi.string().min(1),
    description: Joi.string().min(15),
}).unknown();

export { bookCreateValidator, bookUpdateValidator };
