import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

import { User } from '../../../../domain/user';
import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import { PlanEntity } from 'src/plans/infrastructure/persistence/relational/entities/plan.entity';
import { Workspace } from 'src/workspaces/infrastructure/persistence/relational/entities/workspace.entity';
import { OfferEntity } from 'src/offres/infrastructure/persistence/relational/entities/offre.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper implements User {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ nullable: true })
  phoneNumber?: number;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  userName: string | null;

  @Column({ type: String, nullable: true })
  photo: string | null;

  // @ManyToOne(() => FileEntity, {
  //   eager: true,
  // })
  // photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @ManyToOne(() => PlanEntity, {
    eager: true,
  })
  plan?: PlanEntity;

  @ManyToOne(() => OfferEntity, {
    eager: true,
  })
  offer?: OfferEntity;

  @ManyToMany(() => Workspace, (workspace) => workspace.members)
  @JoinTable()
  workspaces_members: Workspace[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
