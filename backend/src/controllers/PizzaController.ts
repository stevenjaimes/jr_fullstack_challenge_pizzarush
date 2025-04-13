import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { IPizzaService } from "@/repositories/interfaces/IPizzaService";

export class PizzaController {
  constructor(private service: IPizzaService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    const pizzas = await this.service.getAll();
    res.json(pizzas);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const pizza = await this.service.getById(req.params.id);
    pizza ? res.json(pizza) : res.status(404).json({ error: "Pizza not found" });
  };


  create = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const pizzaData = {
        ...req.body,
        imageUrl: req.body.imageUrl, // URL de la imagen subida
        description: req.body.description || '' // Descripción opcional
      };
      
      const newPizza = await this.service.createPizza(pizzaData);
      res.status(201).json(newPizza);
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message || "Failed to create pizza" 
      });
    }
  };
}