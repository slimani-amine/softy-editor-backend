import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Workspace } from 'src/workspaces/infrastructure/persistence/relational/entities/workspace.entity';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  emoji: string = '📝';

  @IsOptional()
  @IsArray()
  content: string;

  @IsNotEmpty()
  workspace: Workspace;

  @IsOptional()
  @IsString()
  coverImageUrl: string;

  @IsOptional()
  @IsBoolean()
  isTemporarilyDeleted: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;
}
