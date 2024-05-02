import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { AllConfigType } from 'src/config/config.type';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {
    this.stripe = new Stripe(
      'sk_test_51PBdod2K3pXBPKaKTiCyEkjr5NgTu97DMeWfSIgn9kQIi9p3JHNlDZuN8G3o3DldO6cp8U11jnZQiZ2E2Tdl9DIM00l9xU0c1W',
      {
        apiVersion: '2024-04-10',
      },
    );
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async webhook(body, signature) {
    let event: Stripe.Event;
    const webhook_key = process.env.WEBHOOK_SECRET as string;

    try {
      event = await this.stripe.webhooks.constructEvent(
        body,
        signature,
        webhook_key,
      );
    } catch (error: any) {
      console.error(error);
      return 'Error';
    }

    if (event.type === 'checkout.session.completed') {
      return 'Success';
    }
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async checkout(body: { id: number; billingPeriod: string }) {
    const { id, billingPeriod } = body;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let offer;
    if (id === 2) {
      offer = {
        id,
        name: 'plus',
        price: billingPeriod === 'monthly' ? 1000 : 800,
      };
    } else if (id === 3) {
      offer = {
        id,
        name: 'buisness',
        price: billingPeriod === 'monthly' ? 1800 : 1500,
      };
    }

    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: offer.name,
        },
        unit_amount: offer.price,
      },
    });
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const token = await Promise.all([
      await this.jwtService.signAsync(
        {
          offerId: id,
          hash: hash,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
    ]);
    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `http://localhost:5173/success?token=${token}`,
      cancel_url: 'http://localhost:5173/canceled',
    });

    return {
      url: session.url,
    };
  }
}
