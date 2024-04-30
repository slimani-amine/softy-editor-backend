import { Module } from '@nestjs/common';
import { RelationalWorkspacePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';

const infrastructurePersistenceModule = RelationalWorkspacePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
  exports: [infrastructurePersistenceModule],
})
export class WorkspacesModule {}
