import { Document } from 'src/documents/infrastructure/persistence/relational/entities/document.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  emoji: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  creator_id: number;

  @OneToMany(() => Document, (document) => document.workspace, { onDelete: 'CASCADE' }) 
  documents: Document[];

  @ManyToMany(() => UserEntity, (members) => members.workspaces_members)
  members: { id: number }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
