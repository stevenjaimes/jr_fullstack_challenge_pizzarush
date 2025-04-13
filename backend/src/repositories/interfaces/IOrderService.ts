import { Order, OrderItem } from "@/models/Order";

export interface IOrderService {
    createOrder(items: OrderItem[]): Promise<Order>;
    getOrderById(id: string): Promise<Order | undefined>;
    getOrders(): Promise<Order[]>;
}