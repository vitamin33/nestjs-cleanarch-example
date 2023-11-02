import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;
}

export class AddOrderDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly info: string;
}
