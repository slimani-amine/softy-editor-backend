import { IsString, IsNotEmpty } from 'class-validator';

export class InviteMembersDto {
  @IsString()
  @IsNotEmpty()
  emails: string[];
}