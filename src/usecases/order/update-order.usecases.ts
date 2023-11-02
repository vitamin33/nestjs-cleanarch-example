import { ILogger } from '../../domain/logger/logger.interface';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';

export class updateOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: number, isDone: boolean): Promise<void> {
    await this.orderRepository.updateInfo(id, isDone);
    this.logger.log(
      'updateOrderUseCases execute',
      `Order ${id} have been updated`,
    );
  }
}
