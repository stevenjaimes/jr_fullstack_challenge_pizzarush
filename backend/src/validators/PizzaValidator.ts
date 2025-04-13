// src/validators/PizzaValidator.ts
import { body } from 'express-validator';

export const pizzaValidations = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('price')
    .isNumeric().withMessage('Price must be a number')
    .custom((value) => value > 0).withMessage('Price must be greater than 0'),

  body('ingredients')
    .isArray({ min: 1 }).withMessage('Ingredients must be an array with at least 1 item')
    .custom((items) => items.every((item: any) => typeof item === 'string'))
    .withMessage('All ingredients must be strings'),

  body('imageUrl')
    .isString().withMessage('Image URL must be a string')
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('Invalid URL format'),

  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10-500 characters')
];