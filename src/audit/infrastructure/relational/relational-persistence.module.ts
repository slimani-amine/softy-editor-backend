import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogger } from 'src/interceptors/audit.interceptor';
import { AuditEntity } from './entities/audit.entity';
import { auditRepository } from '../audit.repository';
import { AuditRelationalRepository } from './repositories/audit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogger,
    },
    {
      provide: auditRepository,
      useClass: AuditRelationalRepository,
    },
  ],
  exports: [auditRepository],
})
export class RelationalAuditPersistenceModule {}
