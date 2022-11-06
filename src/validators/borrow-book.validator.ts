import * as Joi from 'joi';

const borrowBookValidator = Joi.object({
    bookId: Joi.number().required(),
}).unknown();

export { borrowBookValidator };
