import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceRepository } from '../workspace.repository';
import { WorkspaceRelationalRepository } from './repositories/workspace.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { Document } from 'src/documents/infrastructure/persistence/relational/entities/document.entity'; // Import Document entity
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, UserEntity, Document]), // Include Document entity here
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService]
    }),
    MailModule
  ],
  providers: [
    WorkspaceRelationalRepository,
    {
      provide: WorkspaceRepository,
      useClass: WorkspaceRelationalRepository,
    },
    ConfigService, 
  ],
  exports: [WorkspaceRepository],
})
export class RelationalWorkspacePersistenceModule {}
