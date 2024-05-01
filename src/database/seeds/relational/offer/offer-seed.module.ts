import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from 'src/offres/infrastructure/persistence/relational/entities/offre.entity';
import { OfferSeedService } from './offer-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity])],
  providers: [OfferSeedService],
  exports: [OfferSeedService],
})
export class OfferSeedModule {}
