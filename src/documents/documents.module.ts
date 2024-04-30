import { Module } from '@nestjs/common';

import { RelationalDocumentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

const infrastructurePersistenceModule = RelationalDocumentPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [DocumentsService],
  controllers: [DocumentsController],
  exports: [infrastructurePersistenceModule],
})
export class DocumentsModule {}
