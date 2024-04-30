import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'src/documents/infrastructure/persistence/relational/entities/document.entity';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  emoji: string;

  @IsOptional()
  creator_id: number;

  @IsOptional()
  user: { id: number };

  @IsOptional()
  members: any;

  @IsOptional()
  documents: Document[];
}
