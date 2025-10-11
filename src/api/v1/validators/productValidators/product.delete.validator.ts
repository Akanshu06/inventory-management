import Joi from 'joi';

export const deleteProductSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};