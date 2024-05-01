import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { Offer } from 'src/offres/domain/offer';

@Entity({
  name: 'offer',
})
export class OfferEntity extends EntityRelationalHelper implements Offer {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
