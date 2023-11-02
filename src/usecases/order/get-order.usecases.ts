import { OrderM } from '../../domain/model/order';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';

export class GetOrderUseCases {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: number): Promise<OrderM> {
    return await this.orderRepository.findById(id);
  }
}
