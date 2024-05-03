import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auditLog: string;

  @Column()
  userId: number;

  @Column()
  attributes: string;

  @CreateDateColumn()
  createdAt: Date;
}
