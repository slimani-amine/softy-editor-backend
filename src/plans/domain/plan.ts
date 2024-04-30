import { Allow } from 'class-validator';

export class Plan {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
