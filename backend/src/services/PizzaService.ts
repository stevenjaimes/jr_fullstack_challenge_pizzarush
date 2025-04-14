import { Pizza } from "@/models/Pizza";
import { IPizzaRepository } from "@/repositories/interfaces/IPizzaRepository";
import { IPizzaService } from "@/repositories/interfaces/IPizzaService";

export class PizzaService implements IPizzaService {

  constructor(private repository: IPizzaRepository) {} 

  async getAll(): Promise<Pizza[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Pizza | undefined> {
    return this.repository.getById(id);
  }

  async createPizza(pizzaData: Omit<Pizza, "id">): Promise<Pizza> {
    const exists = await this.repository.existsByName(pizzaData.name);
    if (exists) throw new Error("Pizza name already exists");
    
    return this.repository.create(pizzaData);
  }
}