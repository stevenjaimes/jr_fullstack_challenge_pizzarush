import { Order, OrderItem } from "@/models/Order";
import { IPizzaService } from "@/repositories/interfaces/IPizzaService";
import { IOrderRepository } from "@/repositories/interfaces/IOrderRepository";
import { IOrderService } from "@/repositories/interfaces/IOrderService";

export class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private pizzaService: IPizzaService 
  ) {}

  async createOrder(userId: string, items: OrderItem[]): Promise<Order> {
    if (!userId) throw new Error("Se requiere userId para crear una orden");
    let total = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const pizza = await this.pizzaService.getById(item.pizzaId); 
      if (!pizza) throw new Error(`Pizza con ID ${item.pizzaId} no encontrada`);
      
      // Crear un nuevo OrderItem con todos los datos necesarios
      const orderItem: OrderItem = {
        pizzaId: pizza.id,
        name: pizza.name,          // Guardamos el nombre actual
        quantity: item.quantity,
        price: pizza.price,        // Guardamos el precio actual
      };
      
      orderItems.push(orderItem);
      total += pizza.price * item.quantity;
    }

    const newOrder: Order = {
      userId, 
      items: orderItems, // Usamos los items con todos los datos
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

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.getByUserId(userId);
  }
  
}