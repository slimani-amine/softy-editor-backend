import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuditEntity } from '../entities/audit.entity';
import { Repository } from 'typeorm';
import { auditRepository } from '../../audit.repository';

@Injectable()
export class AuditRelationalRepository implements auditRepository {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,
  ) {}

  async create(data: AuditEntity): Promise<AuditEntity> {
    const newEntity = await this.auditRepository.save(
      this.auditRepository.create(data),
    );
    return newEntity;
  }

  async findAll({
    type,
    userId,
  }: {
    type?: string;
    userId?: number;
  }): Promise<AuditEntity[] | null> {
    const where: any = {};
    if (type) where.auditLog = type;
    if (userId) where.userId = userId;

    const entity = await this.auditRepository.find({
      where: where,
      order: { createdAt: -1 },
    });
    return entity ? entity : null;
  }
}
