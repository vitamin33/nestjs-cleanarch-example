import { ILogger } from '../../domain/logger/logger.interface';
import { OrderM } from '../../domain/model/order';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';

export class addOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(info: string): Promise<OrderM> {
    const order = new OrderM();
    order.info = info;
    order.isDone = false;
    const result = await this.orderRepository.insert(order);
    this.logger.log('addOrderUseCases execute', 'New order have been inserted');
    return result;
  }
}
