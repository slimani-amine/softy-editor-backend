import { Injectable } from '@nestjs/common';
import { auditRepository } from './infrastructure/audit.repository';

@Injectable()
export class AuditService {
  constructor(private dbService: auditRepository) {}
  async getAuditLogs({
    type,
    userId,
  }: {
    type?: string;
    userId?: number;
  }): Promise<any> {
    const auditLogs = await this.dbService.findAll({ type, userId });
    return auditLogs;
  }
}
