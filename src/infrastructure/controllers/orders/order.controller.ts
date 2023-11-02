import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { GetOrderUseCases } from '../../../usecases/order/get-order.usecases';
import { OrderPresenter } from './order.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getOrdersUseCases } from '../../../usecases/order/get-orders.usecases';
import { updateOrderUseCases } from '../../../usecases/order/update-order.usecases';
import { AddOrderDto, UpdateOrderDto } from './order.dto';
import { deleteOrderUseCases } from '../../../usecases/order/delete-order.usecases';
import { addOrderUseCases } from '../../../usecases/order/add-order.usecases';

@Controller('order')
@ApiTags('order')
@ApiExtraModels(OrderPresenter)
export class OrderController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORDER_USECASES_PROXY)
    private readonly getOrderUsecaseProxy: UseCaseProxy<GetOrderUseCases>,
    @Inject(UsecasesProxyModule.GET_ORDERS_USECASES_PROXY)
    private readonly getAllOrderUsecaseProxy: UseCaseProxy<getOrdersUseCases>,
    @Inject(UsecasesProxyModule.PUT_ORDER_USECASES_PROXY)
    private readonly updateOrderUsecaseProxy: UseCaseProxy<updateOrderUseCases>,
    @Inject(UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY)
    private readonly deleteOrderUsecaseProxy: UseCaseProxy<deleteOrderUseCases>,
    @Inject(UsecasesProxyModule.POST_ORDER_USECASES_PROXY)
    private readonly addOrderUsecaseProxy: UseCaseProxy<addOrderUseCases>,
  ) {}

  @Get('order')
  @ApiResponseType(OrderPresenter, false)
  async getOrder(@Query('id', ParseIntPipe) id: number) {
    const order = await this.getOrderUsecaseProxy.getInstance().execute(id);
    return new OrderPresenter(order);
  }

  @Get('orders')
  @ApiResponseType(OrderPresenter, true)
  async getOrders() {
    const orders = await this.getAllOrderUsecaseProxy.getInstance().execute();
    return orders.map((order) => new OrderPresenter(order));
  }

  @Put('order')
  @ApiResponseType(OrderPresenter, true)
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    const { id, isDone } = updateOrderDto;
    await this.updateOrderUsecaseProxy.getInstance().execute(id, isDone);
    return 'success';
  }

  @Delete('order')
  @ApiResponseType(OrderPresenter, true)
  async deleteOrder(@Query('id', ParseIntPipe) id: number) {
    await this.deleteOrderUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('order')
  @ApiResponseType(OrderPresenter, true)
  async addOrder(@Body() addOrderDto: AddOrderDto) {
    const { info: info } = addOrderDto;
    const orderCreated = await this.addOrderUsecaseProxy
      .getInstance()
      .execute(info);
    return new OrderPresenter(orderCreated);
  }
}
