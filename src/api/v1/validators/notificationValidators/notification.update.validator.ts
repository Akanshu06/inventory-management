import Joi from 'joi';

export const notificationIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};