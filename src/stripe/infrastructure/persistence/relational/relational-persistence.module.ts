import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/stripe.entity';
import { WorkspaceRepository } from '../stripe.repository';
import { WorkspaceRelationalRepository } from './repositories/stripe.repository';
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
