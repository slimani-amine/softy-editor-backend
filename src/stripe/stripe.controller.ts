import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  // async getProducts() {
  //   return await this.stripeService.createPaymentInterne();
  // }
  // @Post('verfier')
  // async verfier(@Body() body) {
  //   return await this.stripeService.verifierPayment(body.id);
  // }
  // @Get('customers')
  // async getCustomers() {
  //   return await this.stripeService.getProducts();
  // }
  @Post('checkout')
  async checkout(@Body() ids: string[]) {
    return await this.stripeService.checkout(ids);
    // return await this.stripeService.getCustomers();
  }
  @Post('webhook')
  async webhook(@Headers() headers, @Body() body) {
    const signature = headers['Stripe-Signature'] as string;

    return await this.stripeService.webhook(body, signature);
    // return await this.stripeService.getCustomers();
  }
}