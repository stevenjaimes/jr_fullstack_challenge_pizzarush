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
    .withMessage('All ingredients must be strings')   


];