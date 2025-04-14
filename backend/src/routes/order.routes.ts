import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderService } from "../services/OrderService";
import { OrderRepository } from "../repositories/OrderRepository";
import { PizzaService } from "../services/PizzaService";
import { orderValidations } from "../validators/OrderValidator";
import { PizzaRepository } from "../repositories/PizzaRepository";


const router = Router();

const pizzaRepository = new PizzaRepository();
const pizzaService = new PizzaService(pizzaRepository); 

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, pizzaService);
const orderController = new OrderController(orderService);

router.post("/", orderValidations, orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

export default router;