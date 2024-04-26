import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '../domain/plan';
import { IsNumber } from 'class-validator';

export class PlanDto implements Plan {
  @ApiProperty()
  @IsNumber()
  id: number;
}
