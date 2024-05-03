import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EntityCondition } from '../../../../../utils/types/entity-condition.type';
import { Workspace } from '../entities/workspace.entity';
import { WorkspaceRepository } from '../../workspace.repository';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class WorkspaceRelationalRepository implements WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspacesRepository: Repository<Workspace>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: Workspace, user: JwtPayloadType): Promise<Workspace> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const userId = +user.id;
    data.members = [{ id: userId }];
    data.creator_id = userId;

    const newEntity = await this.workspacesRepository.save(
      this.workspacesRepository.create(data),
    );
    return newEntity;
  }
  async findAll(user: JwtPayloadType): Promise<Workspace[] | null> {
    const userId = +user.id;

    const entity = await this.workspacesRepository.find({
      where: { members: { id: userId } },
      relations: ['members'],
    });
    return entity ? entity : null;
  }

  async findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>> {
    const entity = await this.workspacesRepository.findOne({
      where: fields as FindOptionsWhere<Document>,
      relations: ['members'],
    });
    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    return entity;
  }

  async update(
    id: Workspace['id'],
    payload: Partial<Workspace>,
  ): Promise<Workspace> {
    const entity = await this.workspacesRepository.findOne({
      where: { id: Number(id) },
      relations: ['members'],
    });

    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    entity.updatedAt = new Date();
    if (payload.members) {
      const users = await this.usersRepository.find({
        where: { id: 12 },
      });
      if (users.length !== payload.members.length) {
        throw new NotFoundException('Some users are not found');
      }
    }

    const updatedEntity = await this.workspacesRepository.create({
      ...entity,
      ...payload,
    });
    await this.workspacesRepository.save(updatedEntity);

    return updatedEntity;
  }

  async Delete(id: Workspace['id']): Promise<void> {
    const entity = await this.workspacesRepository.findOne({
      where: { id: Number(id) },
    });
    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    await this.workspacesRepository.remove(entity);
  }
}
