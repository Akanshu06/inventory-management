import Joi from 'joi';

export const deleteLocationSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};