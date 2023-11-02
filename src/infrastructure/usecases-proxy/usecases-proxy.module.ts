import { DynamicModule, Module } from '@nestjs/common';
import { addOrderUseCases } from '../../usecases/order/addOrder.usecases';
import { deleteOrderUseCases } from '../../usecases/order/deleteOrder.usecases';
import { GetOrderUseCases } from '../../usecases/order/getOrder.usecases';
import { getOrdersUseCases } from '../../usecases/order/getOrders.usecases';
import { updateOrderUseCases } from '../../usecases/order/updateOrder.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseOrderRepository } from '../repositories/order.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_ORDER_USECASES_PROXY = 'getOrderUsecasesProxy';
  static GET_ORDERS_USECASES_PROXY = 'getOrdersUsecasesProxy';
  static POST_ORDER_USECASES_PROXY = 'postOrderUsecasesProxy';
  static DELETE_ORDER_USECASES_PROXY = 'deleteOrderUsecasesProxy';
  static PUT_ORDER_USECASES_PROXY = 'putOrderUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseOrderRepository],
          provide: UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
          useFactory: (orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new GetOrderUseCases(orderRepository)),
        },
        {
          inject: [DatabaseOrderRepository],
          provide: UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
          useFactory: (orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new getOrdersUseCases(orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
          ) => new UseCaseProxy(new addOrderUseCases(logger, orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
          ) =>
            new UseCaseProxy(new updateOrderUseCases(logger, orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
          ) =>
            new UseCaseProxy(new deleteOrderUseCases(logger, orderRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
        UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
        UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
        UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}
