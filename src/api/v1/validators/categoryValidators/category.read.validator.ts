import Joi from 'joi';

export const categoryIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};