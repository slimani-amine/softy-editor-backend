import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Plan } from '../../../../domain/plan';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'plan',
})
export class PlanEntity extends EntityRelationalHelper implements Plan {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
