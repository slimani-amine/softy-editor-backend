import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import stripeConfig from './config/stripe.config';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot()],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: () =>
            'pk_test_51PBdod2K3pXBPKaKGXtBSyW1SZwCnRUh4m9zcSGfDTNOOD9qw2oKEjUURojkIFgl7Hcl5SrehdhtztfXU0BBWycT00plE0hkhR',
          inject: [ConfigService],
        },
      ],
    };
  }
}
