import { Order, OrderItem } from "@/models/Order";
import { IPizzaService } from "@/repositories/interfaces/IPizzaService";
import { IOrderRepository } from "@/repositories/interfaces/IOrderRepository";
import { IOrderService } from "@/repositories/interfaces/IOrderService";

export class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private pizzaService: IPizzaService 
  ) {}

  async createOrder(items: OrderItem[]): Promise<Order> {

    let total = 0;
    for (const item of items) {
      const pizza = await this.pizzaService.getById(item.pizzaId); 
      if (!pizza) throw new Error(`Pizza con ID ${item.pizzaId} no encontrada`);
      total += pizza.price * item.quantity;
    }

    const newOrder: Order = {
      items,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    return this.orderRepository.create(newOrder);
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orderRepository.getById(id);
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }
}