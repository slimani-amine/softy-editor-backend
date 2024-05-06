import { Workspace } from 'src/workspaces/infrastructure/persistence/relational/entities/workspace.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emoji: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  coverImageUrl: string =
    'https://www.notion.so/images/page-cover/woodcuts_6.jpg';

  @Column('boolean', { nullable: true, default: false })
  isTemporarilyDeleted: boolean = false;

  @Column('boolean', { nullable: true, default: false })
  isPublished: boolean = false;

  @ManyToOne(() => Workspace, (workspace) => workspace.documents)
  workspace: {id:number};

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
