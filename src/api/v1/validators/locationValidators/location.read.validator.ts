import Joi from 'joi';

export const locationIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};