import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceRepository } from '../workspace.repository';
import { WorkspaceRelationalRepository } from './repositories/workspace.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, UserEntity])],
  providers: [
    {
      provide: WorkspaceRepository,
      useClass: WorkspaceRelationalRepository,
    },
  ],
  exports: [WorkspaceRepository],
})
export class RelationalWorkspacePersistenceModule {}
