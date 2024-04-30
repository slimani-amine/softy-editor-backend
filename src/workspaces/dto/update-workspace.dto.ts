import { IsString, IsOptional } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  emoji?: string;

  @IsOptional()
  members?: { id: number }[];
}
