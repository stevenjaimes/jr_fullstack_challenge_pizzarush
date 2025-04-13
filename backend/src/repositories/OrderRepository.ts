import { Order } from "@/models/Order";
import db from "../config/firebase"; 
import { IOrderRepository } from "@/repositories/interfaces/IOrderRepository";

export class OrderRepository  implements IOrderRepository {
  private readonly collection = db.collection("orders");

  async create(order: Order): Promise<Order> {
    const docRef = await this.collection.add(order);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Order;
  }

  async getById(id: string): Promise<Order | undefined> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Order) : undefined;
  }

  async getAll(): Promise<Order[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
}