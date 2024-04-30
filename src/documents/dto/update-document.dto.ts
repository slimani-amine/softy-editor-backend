import { IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  emoji?: string;

  @IsOptional()
  @IsArray()
  content?: string;

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
