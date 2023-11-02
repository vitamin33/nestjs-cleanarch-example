import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './orders/order.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [OrderController, AuthController],
})
export class ControllersModule {}
