import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderM } from '../../domain/model/order';
import { OrderRepository } from '../../domain/repositories/orderRepository.interface';
import { Order } from '../entities/order.entity';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
  ) {}

  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.orderEntityRepository.update(
      {
        id: id,
      },
      { is_done: isDone },
    );
  }
  async insert(order: OrderM): Promise<OrderM> {
    const orderEntity = this.toOrderEntity(order);
    const result = await this.orderEntityRepository.insert(orderEntity);
    return this.toOrder(result.generatedMaps[0] as Order);
    console.log(result.generatedMaps);
  }
  async findAll(): Promise<OrderM[]> {
    const ordersEntity = await this.orderEntityRepository.find();
    return ordersEntity.map((orderEntity) => this.toOrder(orderEntity));
  }
  async findById(id: number): Promise<OrderM> {
    const orderEntity = await this.orderEntityRepository.findOneOrFail(id);
    return this.toOrder(orderEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.orderEntityRepository.delete({ id: id });
  }

  private toOrder(orderEntity: Order): OrderM {
    const order: OrderM = new OrderM();

    order.id = orderEntity.id;
    order.info = orderEntity.info;
    order.isDone = orderEntity.is_done;
    order.createdDate = orderEntity.created_date;
    order.updatedDate = orderEntity.updated_date;

    return order;
  }

  private toOrderEntity(order: OrderM): Order {
    const orderEntity: Order = new Order();

    orderEntity.id = order.id;
    orderEntity.info = order.info;
    orderEntity.is_done = order.isDone;

    return orderEntity;
  }
}
