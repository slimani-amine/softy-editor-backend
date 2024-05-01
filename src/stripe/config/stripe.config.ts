import { registerAs } from '@nestjs/config';

import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { StripeConfig } from './stripe-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  STRIPE_API_KEY: string;

  @IsString()
  @IsOptional()
  STRIPE_SECRET_KEY: string;
}

export default registerAs<StripeConfig>('stripe', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    stripeApiKey: process.env.STRIPE_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
});
