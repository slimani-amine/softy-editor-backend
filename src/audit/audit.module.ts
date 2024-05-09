import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { RelationalAuditPersistenceModule } from './infrastructure/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalAuditPersistenceModule;

@Global()
@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [infrastructurePersistenceModule],
})
export class AuditModule {}
