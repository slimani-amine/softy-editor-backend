import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from 'src/offres/infrastructure/persistence/relational/entities/offre.entity';
import { OfferEnum } from 'src/offres/offers.enum';

@Injectable()
export class OfferSeedService {
  constructor(
    @InjectRepository(OfferEntity)
    private repository: Repository<OfferEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: OfferEnum.free,
          name: 'free',
        }),
        this.repository.create({
          id: OfferEnum.plus,
          name: 'plus',
        }),
        this.repository.create({
          id: OfferEnum.buisness,
          name: 'buisness',
        }),
      ]);
    }
  }
}
