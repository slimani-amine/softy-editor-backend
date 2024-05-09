import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUDIT_LOG_DATA } from 'src/audit/decorators/audit-log.decorator';
import { auditRepository } from 'src/audit/infrastructure/audit.repository';
import { AuditEntity } from 'src/audit/infrastructure/relational/entities/audit.entity';

@Injectable()
export class AuditLogger implements NestInterceptor {
  logger = new Logger(AuditLogger.name);
  constructor(
    private readonly reflector: Reflector,
    private readonly dbService: auditRepository,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const auditLog = this.reflector.get<string>(
      AUDIT_LOG_DATA,
      context.getHandler(),
    );
    return next.handle().pipe(
      tap((res) => {
        (async () => {
          if (!auditLog) return;
          const request = await context.switchToHttp().getRequest();
          const attributes = JSON.stringify({
            body: request.body,
            params: request.params,
            res,
          });
          const data: Omit<AuditEntity, 'id'> = {
            auditLog,
            userId: request.user.id,
            attributes,
            createdAt: new Date(),
          };
          await this.dbService.create(data);
          // console.log('Audit Log saved succefully', data);
        })().catch((err) => console.error('Unable to save audit log', err));
      }),
    );
  }
}
