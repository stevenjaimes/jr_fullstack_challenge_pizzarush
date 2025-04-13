import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IOrderService } from "@/repositories/interfaces/IOrderService";

export class OrderController {
  constructor(private orderService: IOrderService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const order = await this.orderService.createOrder(req.body.userId, req.body.items);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const order = await this.orderService.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId as string | undefined;
  
    try {
      const orders = userId
        ? await this.orderService.getOrdersByUserId(userId)
        : await this.orderService.getOrders();
  
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
