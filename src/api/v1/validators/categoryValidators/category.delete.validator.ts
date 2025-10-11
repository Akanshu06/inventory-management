import Joi from 'joi';

export const deleteCategorySchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};