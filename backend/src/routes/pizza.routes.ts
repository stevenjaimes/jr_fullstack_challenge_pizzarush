import { Router } from "express";
import { PizzaController } from "../controllers/PizzaController";
import { PizzaService } from "@/services/PizzaService";
import { PizzaRepository } from "@/repositories/PizzaRepository";
import { pizzaValidations } from '../validators/PizzaValidator';

const router = Router();
const pizzaRepository = new PizzaRepository();
const pizzaService = new PizzaService(pizzaRepository);
const pizzaController = new PizzaController(pizzaService);

router.get("/", pizzaController.getAll);
router.get("/:id", pizzaController.getById);
router.post('/', pizzaValidations, pizzaController.create); 
export default router;