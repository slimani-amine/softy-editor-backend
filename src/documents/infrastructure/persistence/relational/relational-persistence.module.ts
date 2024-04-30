import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { DocumentRepository } from '../document.repository';
import { DocumentRelationalRepository } from './repositories/document.repository';
import { Workspace } from 'src/workspaces/infrastructure/persistence/relational/entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Workspace])],
  providers: [
    {
      provide: DocumentRepository,
      useClass: DocumentRelationalRepository,
    },
  ],
  exports: [DocumentRepository],
})
export class RelationalDocumentPersistenceModule {}
