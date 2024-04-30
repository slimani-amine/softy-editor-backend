import { DeepPartial } from 'typeorm';
import { EntityCondition } from '../../../utils/types/entity-condition.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Document } from './relational/entities/document.entity';

export abstract class DocumentRepository {
  abstract create(
    data: Omit<Document, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Document>;

  abstract findOne(
    fields: EntityCondition<Document>,
  ): Promise<NullableType<Document>>;

  abstract findAll(
    workspaceId: string,
    isTemporarilyDeleted: boolean,
  ): Promise<Document[] | null>;

  abstract update(
    id: Document['id'],
    payload: DeepPartial<Document>,
  ): Promise<Document | null>;

  abstract Delete(id: Document['id']): Promise<void>;
}
