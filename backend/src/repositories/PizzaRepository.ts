import db from "../config/firebase"; 
import { Pizza } from "@/models/Pizza";
import { IPizzaRepository } from "@/repositories/interfaces/IPizzaRepository";

export class PizzaRepository implements IPizzaRepository {
  private readonly collection = db.collection("pizzas");

  async getAll(): Promise<Pizza[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Pizza));
  }

  async getById(id: string): Promise<Pizza | undefined> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Pizza) : undefined;
  }

  async create(pizza: Omit<Pizza, "id">): Promise<Pizza> {
    const docRef = await this.collection.add(pizza);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Pizza;
  }

  async existsByName(name: string): Promise<boolean> {
    const snapshot = await this.collection
        .where("name", "==", name)
        .limit(1)
        .get();
    return !snapshot.empty; 
}

}