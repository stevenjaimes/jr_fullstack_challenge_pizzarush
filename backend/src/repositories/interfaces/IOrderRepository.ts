import { Order } from "@/models/Order";

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    getById(id: string): Promise<Order | undefined>;
    getAll(): Promise<Order[]>;
}