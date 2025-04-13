import { Pizza } from "@/models/Pizza";

export interface IPizzaRepository {
    getAll(): Promise<Pizza[]>;
    getById(id: string): Promise<Pizza | undefined>;
    create(pizza: Omit<Pizza, "id">): Promise<Pizza>;
    existsByName(name: string): Promise<boolean>;
}