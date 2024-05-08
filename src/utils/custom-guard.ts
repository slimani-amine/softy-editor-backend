import { SetMetadata } from '@nestjs/common';

export const SkipJwtGuard = () => SetMetadata('skipJwtGuard', true);