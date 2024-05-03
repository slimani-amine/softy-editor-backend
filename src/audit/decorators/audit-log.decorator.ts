import { SetMetadata } from '@nestjs/common';

export const AUDIT_LOG_DATA = 'audit-log-data';

export const AuditLog = (data: any) => SetMetadata(AUDIT_LOG_DATA, data);
