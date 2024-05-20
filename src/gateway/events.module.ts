/* eslint-disable  */

import { JwtService } from '@nestjs/jwt';
import { GlobalEventsGateWay } from './events.gateways';
import { Module } from '@nestjs/common';

@Module({
  providers: [JwtService, GlobalEventsGateWay],
})
export class EventsRealTimeModule {}
