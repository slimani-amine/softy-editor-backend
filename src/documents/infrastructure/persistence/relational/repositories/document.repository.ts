import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { DocumentRepository } from '../../document.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EntityCondition } from '../../../../../utils/types/entity-condition.type';
import { Workspace } from 'src/workspaces/infrastructure/persistence/relational/entities/workspace.entity';

@Injectable()
export class DocumentRelationalRepository implements DocumentRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    @InjectRepository(Workspace)
    private readonly workspacesRepository: Repository<Workspace>,
  ) {}

  async create(data: Document): Promise<Document> {
    console.log("🚀 ~ DocumentRelationalRepository ~ create ~ data:", data)
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const workspaceId = data.workspace.id;
    if (!workspaceId) throw new NotFoundException('Workspace.id not valid');

    const workspace = await this.workspacesRepository.findOne({
      where: { id: Number(workspaceId) },
    });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    const newEntity = await this.documentsRepository.save(
      this.documentsRepository.create(data),
    );
    return newEntity;
  }

  async findAll(
    workspaceId: string,
    isTemporarilyDeleted: boolean,
  ): Promise<Document[] | null> {
    const entity = await this.documentsRepository.find({
      where: {
        workspace: { id: Number(workspaceId) },
        isTemporarilyDeleted: isTemporarilyDeleted,
      },
      relations: {
        workspace: true,
      },
    });
    return entity ? entity : null;
  }

  async findOne(
    fields: EntityCondition<Document>,
  ): Promise<NullableType<Document>> {
    const entity = await this.documentsRepository.findOne({
      where: fields as FindOptionsWhere<Document>,
      relations: {
        workspace: true,
      },
    });
    if (!entity) {
      throw new NotFoundException('Document not found');
    }
    return entity;
  }

  async update(
    id: Document['id'],
    payload: Partial<Document>,
  ): Promise<Document> {
    const entity = await this.documentsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new NotFoundException('Document not found');
    }
    entity.updatedAt = new Date();
    const updatedEntity = await this.documentsRepository.save({
      ...entity,
      ...payload,
    });

    return updatedEntity;
  }

  async Delete(id: Document['id']): Promise<void> {
    const entity = await this.documentsRepository.findOne({
      where: { id: Number(id) },
    });
    if (!entity) {
      throw new NotFoundException('Document not found');
    }
    await this.documentsRepository.remove(entity);
  }
}
