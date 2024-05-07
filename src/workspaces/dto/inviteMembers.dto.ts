import { IsString, IsNotEmpty } from 'class-validator';

export class InviteMembersDto {
  @IsNotEmpty()
  emails: string[];
}