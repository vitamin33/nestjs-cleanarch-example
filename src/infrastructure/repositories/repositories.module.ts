import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { DatabaseOrderRepository } from './order.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Order, User])],
  providers: [DatabaseOrderRepository, DatabaseUserRepository],
  exports: [DatabaseOrderRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
