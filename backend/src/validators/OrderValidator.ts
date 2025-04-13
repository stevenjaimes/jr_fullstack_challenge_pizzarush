import { body } from "express-validator";

export const orderValidations = [
  body("items").isArray({ min: 1 }).withMessage("Debe haber al menos un ítem"),
  body("items.*.pizzaId").isString().notEmpty(),
  body("items.*.quantity").isInt({ min: 1 }),
];