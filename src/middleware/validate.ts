import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type ValidationSchemas = {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
};

export const validate = (schemas: ValidationSchemas) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                const { error } = schemas.body.validate(req.body);
                if (error) throw error;
            }

            if (schemas.query) {
                const { error } = schemas.query.validate(req.query);
                if (error) throw error;
            }

            if (schemas.params) {
                const { error } = schemas.params.validate(req.params);
                if (error) throw error;
            }

            next();
        } catch (err: any) {
            res.status(400).json({
                message: 'Validation error',
                details: err.details?.map((d: any) => d.message)
            });
        }
    };
