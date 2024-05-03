import { AuditEntity } from './relational/entities/audit.entity';

export abstract class auditRepository {
  abstract create(data: Omit<AuditEntity, 'id'>): Promise<AuditEntity>;
  abstract findAll({
    type,
    userId,
  }: {
    type?: string;
    userId?: number;
  }): Promise<AuditEntity[] | null>;
}
