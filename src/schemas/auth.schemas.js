import Joi from "joi";
import { PWD_REGEX } from "../constants/regex";

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .pattern(PWD_REGEX)
        .min(8)
        .max(32).messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain at least one special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 32 characters long',
            'any.required': 'Password is required'
        })
});

const signupSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(4)
        .max(32)
        .messages({
            'string.min': 'Name must be at least 4 characters long',
            'string.max': 'Name must be at most 32 characters long',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .pattern(PWD_REGEX)
        .min(8)
        .max(32)
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain at least one special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 32 characters long',
            'any.required': 'Password is required'
        })
})

export { loginSchema, signupSchema };