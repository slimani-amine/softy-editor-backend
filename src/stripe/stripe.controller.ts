import {
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stripe')
@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async checkout(@Body() body) {
    return await this.stripeService.checkout(body);
  }
  @Post('webhook')
  async webhook(@Headers() headers, @Body() body) {
    const signature = headers['Stripe-Signature'] as string;

    return await this.stripeService.webhook(body, signature);
  }
}
