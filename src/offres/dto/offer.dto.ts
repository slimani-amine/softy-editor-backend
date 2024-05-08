import { ApiProperty } from '@nestjs/swagger';
import { Offer } from '../domain/offer';
import { IsNumber } from 'class-validator';

export class OfferDto implements Offer {
  @ApiProperty()
  @IsNumber()
  id: number;
}
