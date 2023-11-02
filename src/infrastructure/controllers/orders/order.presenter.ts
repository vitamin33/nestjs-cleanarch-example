import { ApiProperty } from '@nestjs/swagger';
import { OrderM } from '../../../domain/model/order';

export class OrderPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  info: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(order: OrderM) {
    this.id = order.id;
    this.info = order.info;
    this.isDone = order.isDone;
    this.createdate = order.createdDate;
    this.updateddate = order.updatedDate;
  }
}
