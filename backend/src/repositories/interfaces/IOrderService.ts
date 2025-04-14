import { Order, OrderItem } from "@/models/Order";

export interface IOrderService {
  createOrder(userId: string, items: OrderItem[]): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrders(): Promise<Order[]>;
  getOrdersByUserId(userId: string): Promise<Order[]>; 
}
