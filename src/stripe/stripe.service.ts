import { Inject, Injectable } from '@nestjs/common';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
  ) {
    const seckret_key = process.env.STRIPE_SECRET_KEY as string;
    this.stripe = new Stripe(seckret_key, {
      apiVersion: '2024-04-10', // Use whatever API latest version
    });
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

    // const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
      // Your success logic here

      return 'Success';
    }
  }
  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }
  async checkout(ids: string[]) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    // const products = await this.courseService.findCoursesByIds(ids);
    const base_url = process.env.FRONTEND_DOMAIN as string;

    // products.forEach((product) => {
    //   line_items.push({
    //     quantity: 1,

    //     price_data: {
    //       currency: 'USD',
    //       product_data: {
    //         name: product.title,
    //       },
    //       unit_amount: Number(product.course_price) * 100,
    //     },
    //   });
    // });
    const session = await this.stripe.checkout.sessions.create({
      line_items,

      mode: 'payment',
      // billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },

      success_url:"localhost:5173/success",
      cancel_url: "localhost:5173/canceled",
    });

    return {
      url: session.url,
    };
  }

  // async createPaymentInterne() {
  //   const result = await this.stripe.paymentIntents.create({
  //     amount: 2000,
  //     currency: 'usd',
  //     automatic_payment_methods: {
  //       enabled: true,
  //     },
  //   });
  //   return result;
  // }
  // async verifierPayment(id: string) {
  //   try {
  //     const result = await this.stripe.charges.retrieve(id);

  //     return result;
  //   } catch (error) {}
  // }
}