import Joi from 'joi';

export const addListSchema = {
    body: Joi.object({
        contentId: Joi.string().trim().required(),
        contentType: Joi.string().valid('MOVIE', 'TV_SHOW').required()
    })
};

export const GetListSchema = {
    query: Joi.object({
        page: Joi.number().integer().min(1).optional(),
        limit: Joi.number().integer().min(1).max(100).optional()
    })
};

export const removeListSchema = {
    params: Joi.object({
        contentId: Joi.string().required()
    })
};
