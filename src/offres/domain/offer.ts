import { Allow } from 'class-validator';

export class Offer {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
