import { ApiProperty } from '@nestjs/swagger';

export class GetUsersByEmailsDto {
  @ApiProperty({ example: 'test1@example.com' })
  emails: string[];
}
