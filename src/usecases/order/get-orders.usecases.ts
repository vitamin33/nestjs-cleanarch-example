import { OrderM } from '../../domain/model/order';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';

export class getOrdersUseCases {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderM[]> {
    return await this.orderRepository.findAll();
  }
}
