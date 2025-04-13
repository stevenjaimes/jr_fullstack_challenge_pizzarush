import { OrderItem } from "@/models/OrderItem";

export interface Order {
  id?: string;     
  items: OrderItem[];
  total: number;   
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

export { OrderItem };