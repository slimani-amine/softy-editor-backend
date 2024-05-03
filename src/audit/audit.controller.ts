import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('v1/audit-logs')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  async getAll(
    @Query('type') type?: string,
    @Query('userId') userId?: number,
  ): Promise<any> {
    return await this.auditService.getAuditLogs({ type, userId });
  }
}
