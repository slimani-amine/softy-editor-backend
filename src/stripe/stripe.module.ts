import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Adjust this based on your actual secret key configuration
        signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
      }),
      inject: [ConfigService],
    }),
    // Other imports...
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
