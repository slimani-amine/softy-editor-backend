import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './infrastructure/persistence/document.repository';
import { Document } from './infrastructure/persistence/relational/entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateDocumentDto } from './dto/update-document.dto';
// import { DocumentRepository } from './infrastructure/persistence/document.repository';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentRepository) {}

  create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsRepository.create(createDocumentDto);
  }

  findAll(
    workspaceId: string,
    isTemporarilyDeleted: boolean,
  ): Promise<Document[] | null> {
    return this.documentsRepository.findAll(workspaceId, isTemporarilyDeleted);
  }

  findOne(fields: EntityCondition<Document>): Promise<NullableType<Document>> {
    return this.documentsRepository.findOne(fields);
  }
  update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document | null> {
    return this.documentsRepository.update(id, updateDocumentDto);
  }
  delete(id: number): Promise<void> {
    return this.documentsRepository.Delete(id);
  }
}
