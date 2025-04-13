import { Pizza } from "@/models/Pizza";

export interface IPizzaService {
    getAll(): Promise<Pizza[]>;
    getById(id: string): Promise<Pizza | undefined>; 
    createPizza(pizzaData: Omit<Pizza, "id">): Promise<Pizza>;
}