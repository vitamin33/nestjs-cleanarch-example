import { OrderM } from '../model/order';

export interface OrderRepository {
  insert(order: OrderM): Promise<OrderM>;
  findAll(): Promise<OrderM[]>;
  findById(id: number): Promise<OrderM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
