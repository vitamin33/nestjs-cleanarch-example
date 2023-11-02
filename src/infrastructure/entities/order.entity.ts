import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  info: string;

  @Column('boolean', { default: false })
  is_done: boolean;

  @CreateDateColumn({ name: 'createdate' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updated_date: Date;
}
