import { Expose, Transform } from 'class-transformer';

export class DocumentDto {
  @Expose()
  id: number;
  @Expose()
  emoji: string;
  @Expose()
  title: string;
  @Expose()
  content: Array<string>;

  @Transform(({ obj }) => obj.workspace.id)
  @Expose()
  workspaceId: number;
}
